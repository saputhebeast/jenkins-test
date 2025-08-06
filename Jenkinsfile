pipeline {
    agent any
    
    environment {
        GITHUB_TOKEN = credentials('github-token')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "🔄 Checking out code..."
                script {
                    if (env.CHANGE_ID) {
                        updateGitHubStatus('pending', 'Jenkins build started 🚀')
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo "📦 Installing dependencies..."
                sh '''
                    node --version
                    npm --version
                    npm install
                '''
            }
        }
        
        stage('Run Tests') {
            steps {
                echo "🧪 Running tests..."
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            when {
                allOf {
                    branch 'main'
                    not { changeRequest() }
                }
            }
            steps {
                echo "🚀 Deploying to production..."
                echo "This would deploy your app!"
            }
        }
    }
    
    post {
        success {
            script {
                if (env.CHANGE_ID) {
                    updateGitHubStatus('success', 'All tests passed! ✅ Ready to merge')
                }
            }
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            script {
                if (env.CHANGE_ID) {
                    updateGitHubStatus('failure', 'Build failed ❌ Check logs')
                }
            }
            echo "❌ Pipeline failed!"
        }
    }
}

def updateGitHubStatus(state, description) {
    if (!env.CHANGE_ID) return
    
    sh """
        curl -X POST \
        -H "Authorization: token ${GITHUB_TOKEN}" \
        -H "Content-Type: application/json" \
        -d '{"state": "${state}", "description": "${description}", "context": "jenkins", "target_url": "${BUILD_URL}"}' \
        "https://api.github.com/repos/saputhebeast/jenkins-test/statuses/${env.GIT_COMMIT}"
    """
    echo "📝 GitHub status updated: ${description}"
}
