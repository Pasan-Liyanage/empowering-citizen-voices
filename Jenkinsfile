pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        IMAGE_PREFIX = 'pasanx/empowering'
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Pasan-Liyanage/empowering-citizen-voices.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install Backend') {
            steps {
                dir('Server') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t ${IMAGE_PREFIX}-server:${BUILD_NUMBER} -t ${IMAGE_PREFIX}-server:latest ./Server'
                sh 'docker build -t ${IMAGE_PREFIX}-client:${BUILD_NUMBER} -t ${IMAGE_PREFIX}-client:latest ./client'
            }
        }

        stage('Push Images') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push ${IMAGE_PREFIX}-server:${BUILD_NUMBER}'
                sh 'docker push ${IMAGE_PREFIX}-server:latest'
                sh 'docker push ${IMAGE_PREFIX}-client:${BUILD_NUMBER}'
                sh 'docker push ${IMAGE_PREFIX}-client:latest'
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
            sh 'docker system prune -f || true'
        }
    }
}