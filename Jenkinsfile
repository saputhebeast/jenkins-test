pipeline {
    agent any
    
    environment {
        GITHUB_TOKEN = credentials('github-token')
        REPO_OWNER = 'saputhebeast'
        REPO_NAME = 'jenkins-test'
    }
    
    stages {
        stage('Setup') {
            steps {
                script {
                    // Update GitHub status for PRs
                    if (env.CHANGE_ID) {
                        updateGitHubStatus('pending', 'Jenkins build started 🚀')
                        echo "🔍 This is Pull Request #${env.CHANGE_ID}"
                        echo "PR Title: ${env.CHANGE_TITLE ?: 'No title'}"
                        echo "PR Author: ${env.CHANGE_AUTHOR ?: 'Unknown'}"
                        echo "Target Branch: ${env.CHANGE_TARGET ?: 'main'}"
                    } else {
                        echo "🚀 This is a push to ${env.GIT_BRANCH} branch"
                    }
                }
                
                echo "🔍 Environment Check..."
                sh 'node --version'
                sh 'npm --version'
                sh 'pwd && ls -la'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm install'
                echo '✅ Dependencies installed successfully'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test'
                echo '✅ All tests passed!'
            }
        }
        
        stage('PR Validation') {
            when {
                changeRequest() // Only for Pull Requests
            }
            steps {
                echo '🔍 Running PR-specific validations...'
                
                script {
                    // Example PR validations
                    def changedFiles = sh(
                        script: 'git diff --name-only HEAD~1 || echo "No changes"',
                        returnStdout: true
                    ).trim()
                    
                    echo "📋 Files changed in this PR:"
                    echo changedFiles
                    
                    // Add your PR validation logic here
                    if (changedFiles.contains('package.json')) {
                        echo '⚠️  package.json was modified - checking for security vulnerabilities'
                        sh 'npm audit --audit-level=high'
                    }
                    
                    echo '✅ PR validation completed successfully!'
                }
            }
        }
        
        stage('Build & Package') {
            steps {
                echo '🔨 Building application...'
                sh 'echo "Build commands would go here"'
                // Add your build commands here:
                // sh 'npm run build'
                // sh 'npm run package'
                echo '✅ Build completed successfully!'
            }
        }
        
        stage('Deploy to Production') {
            when {
                allOf {
                    branch 'main'
                    not { changeRequest() }
                }
            }
            steps {
                echo '🚀 Deploying to production...'
                echo 'This stage only runs when changes are merged to main branch'
                
                // Add your deployment logic here:
                // sh 'kubectl apply -f deployment.yaml'
                // sh 'terraform apply -auto-approve'
                // sh 'docker build -t myapp:latest .'
                
                echo '✅ Production deployment completed!'
            }
        }
    }
    
    post {
        success {
            script {
                if (env.CHANGE_ID) {
                    updateGitHubStatus('success', '✅ All checks passed! Ready to merge')
                } else {
                    echo '✅ Main branch build successful!'
                }
            }
            echo '🎉 Pipeline completed successfully!'
        }
        
        failure {
            script {
                if (env.CHANGE_ID) {
                    updateGitHubStatus('failure', '❌ Build failed! Check logs for details')
                } else {
                    echo '❌ Main branch build failed!'
                }
            }
            echo '💥 Pipeline failed - check the logs above'
        }
        
        unstable {
            script {
                if (env.CHANGE_ID) {
                    updateGitHubStatus('failure', '⚠️  Build unstable! Some tests may have failed')
                }
            }
            echo '⚠️  Pipeline completed but is unstable'
        }
        
        always {
            echo '🏁 Pipeline finished - cleaning up...'
            // Add cleanup steps here if needed
        }
    }
}

/**
 * Update GitHub commit status for Pull Requests
 */
def updateGitHubStatus(String state, String description) {
    if (!env.CHANGE_ID) {
        echo "ℹ️  Not a Pull Request - skipping GitHub status update"
        return
    }
    
    def commitSha = env.GIT_COMMIT
    def targetUrl = env.BUILD_URL
    def context = "continuous-integration/jenkins"
    
    echo "📡 Updating GitHub status: ${state} - ${description}"
    
    def payload = [
        state: state,
        target_url: targetUrl,
        description: description,
        context: context
    ]
    
    def jsonPayload = groovy.json.JsonBuilder.new(payload).toString()
    
    try {
        def response = sh(
            script: """
                curl -s -w "HTTP_CODE:%{http_code}" -X POST \
                -H "Authorization: token \${GITHUB_TOKEN}" \
                -H "Accept: application/vnd.github.v3+json" \
                -H "Content-Type: application/json" \
                -d '${jsonPayload}' \
                "https://api.github.com/repos/\${REPO_OWNER}/\${REPO_NAME}/statuses/${commitSha}"
            """,
            returnStdout: true
        ).trim()
        
        if (response.contains('HTTP_CODE:201') || response.contains('HTTP_CODE:200')) {
            echo "✅ GitHub status updated successfully!"
        } else {
            echo "⚠️  GitHub status update response: ${response}"
        }
    } catch (Exception e) {
        echo "❌ Failed to update GitHub status: ${e.getMessage()}"
        // Don't fail the build if status update fails
    }
}
