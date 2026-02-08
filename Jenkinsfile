pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        IMAGE_CLIENT = "pasanx/empowering-client"
        IMAGE_SERVER = "pasanx/empowering-server"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Pasan-Liyanage/empowering-citizen-voices.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install Node deps') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u root'
                }
            }
            steps {
                sh '''
                  cd Server && npm ci --only=production
                  cd ../client && npm ci
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
