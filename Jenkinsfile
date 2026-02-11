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

        stage('Backend') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u root --network jenkins-net'
                }
            }
            steps {
                sh 'cd Server && npm ci --only=production'
                sh 'docker build -t pasanx/empowering-server:$BUILD_NUMBER ./Server'
            }
        }

        stage('Frontend') {
            agent {
                docker {
                    image 'node:18-alpine'
                    args '-u root --network jenkins-net'
                }
            }
            steps {
                sh 'cd client && npm ci && npm run build'
                sh 'docker build -t pasanx/empowering-client:$BUILD_NUMBER ./client'
            }
        }

        stage('Push') {
            steps {
                sh '''
                  echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin
                  docker push pasanx/empowering-server:$BUILD_NUMBER
                  docker push pasanx/empowering-client:$BUILD_NUMBER
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
