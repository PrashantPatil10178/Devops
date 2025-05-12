pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'echo "Simulating build..."'
                sh 'mkdir -p build && touch build/app.txt'
            }
        }
        stage('Test') {
            steps {
                sh 'echo "Running tests..."'
                sh 'test -f build/app.txt && echo "Build artifact found!"'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "Deploying application..."'
                sh 'cp build/app.txt . && echo "Deployed!"'
            }
        }
    }
}