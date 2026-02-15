pipeline {
    agent any

    environment {
        IMAGE_PREFIX = 'pasanx/empowering'
        TERRAFORM_DIR = '/var/lib/jenkins/terraform-app'
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

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                        docker push ${IMAGE_PREFIX}-server:${BUILD_NUMBER}
                        docker push ${IMAGE_PREFIX}-server:latest
                        docker push ${IMAGE_PREFIX}-client:${BUILD_NUMBER}
                        docker push ${IMAGE_PREFIX}-client:latest
                    """
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-creds'
                ]]) {
                    sh """
                        cd ${TERRAFORM_DIR}
                        terraform init
                        terraform apply -auto-approve
                    """
                }
            }
        }

        stage('Deploy to App Server') {
            steps {
                script {
                    def app_ip = sh(
                        script: "cd ${TERRAFORM_DIR} && terraform output -raw app_public_ip",
                        returnStdout: true
                    ).trim()

                    sshagent(['ec2-key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${app_ip} '
                                sudo apt update &&
                                sudo apt install -y docker.io docker-compose &&
                                sudo systemctl start docker &&
                                sudo usermod -aG docker ubuntu &&
                                docker pull ${IMAGE_PREFIX}-server:latest &&
                                docker pull ${IMAGE_PREFIX}-client:latest &&
                                echo "version: \\"3\\"
services:
  server:
    image: ${IMAGE_PREFIX}-server:latest
    ports:
      - \\"5004:5004\\"
  client:
    image: ${IMAGE_PREFIX}-client:latest
    ports:
      - \\"80:80\\"
    depends_on:
      - server" > docker-compose.yml &&
                                docker-compose down || true &&
                                docker-compose up -d
                            '
                        """
                    }
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