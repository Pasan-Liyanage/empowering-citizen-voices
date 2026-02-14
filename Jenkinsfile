pipeline {
    agent any

    environment {
        IMAGE_PREFIX = 'pasanx/empowering'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Pasan-Liyanage/empowering-citizen-voices.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh """
                    docker build -t ${IMAGE_PREFIX}-server:${BUILD_NUMBER} -t ${IMAGE_PREFIX}-server:latest ./Server
                    docker build -t ${IMAGE_PREFIX}-client:${BUILD_NUMBER} -t ${IMAGE_PREFIX}-client:latest ./client
                """
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push ${IMAGE_PREFIX}-server:${BUILD_NUMBER}
                        docker push ${IMAGE_PREFIX}-server:latest
                        docker push ${IMAGE_PREFIX}-client:${BUILD_NUMBER}
                        docker push ${IMAGE_PREFIX}-client:latest
                    """
                }
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