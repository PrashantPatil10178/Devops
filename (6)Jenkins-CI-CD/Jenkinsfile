pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/PrashantPatil10178/CI-CD.git'
            }
        }
        
        stage('Build') {
            steps {
                dir('app') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('app') {
                    sh 'npm test'
                }
            }
        }
        
        
        
    }
    
    post {
        always {
            // Basic cleanup without cleanWs
            
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}