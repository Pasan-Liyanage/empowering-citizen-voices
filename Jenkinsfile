pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Pasan-Liyanage/empowering-citizen-voices.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Build Backend') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u root'
                }
            }
            steps {
                sh 'cd Server && npm ci --only=production'
                sh 'docker build -t pasanx/empowering-server:latest ./Server'
            }
        }

        stage('Build Frontend') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u root'
                }
            }
            steps {
                sh 'cd client && npm ci && npm run build'
                sh 'docker build -t pasanx/empowering-client:latest ./client'
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                  echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin
                  docker push pasanx/empowering-server:latest
                  docker push pasanx/empowering-client:latest
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
