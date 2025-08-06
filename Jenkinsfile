pipeline {
    agent any
    
    stages {
        stage('Check Environment') {
            steps {
                echo '🔍 Checking environment...'
                sh 'node --version || echo "Node.js not found"'
                sh 'npm --version || echo "NPM not found"'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test'
            }
        }
        
        stage('Build Complete') {
            steps {
                echo '✅ Build completed successfully!'
                sh 'ls -la'
            }
        }
    }
    
    post {
        success {
            echo '🎉 Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        always {
            echo '🏁 Pipeline finished.'
        }
    }
}
