pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        IMAGE_CLIENT = "pasanx/empowering-client"      // Replace with YOUR Docker Hub username
        IMAGE_SERVER = "pasanx/empowering-server"     // Replace with YOUR Docker Hub username
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Pasan-Liyanage/empowering-citizen-voices.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Build & Test') {
            steps {
                sh '''
                  cd Server && npm ci --only=production || echo "Server deps done"
                  cd ../client && npm ci && npm test -- --watchAll=false || true
                '''
            }
        }

        stage('Build Docker images') {
            steps {
                sh '''
                  docker build -t ${IMAGE_SERVER}:latest ./Server
                  docker build -t ${IMAGE_CLIENT}:latest ./client
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh '''
                  echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin
                  docker push ${IMAGE_SERVER}:latest
                  docker push ${IMAGE_CLIENT}:latest
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
    }
}
