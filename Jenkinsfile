pipeline {
	agent none
	stages {
		stage('Build and deploy to dev') {
			agent { label 'dev.xr.globalvirtual.world' }
			stages {
				stage('Pull repository') {
					steps {
						sh 'hg id -i > .build_revision'
					}
				}
				stage('Build') {
					agent { 
						docker {
							label 'dev.xr.globalvirtual.world'
							image 'hub.globalvirtual.world/node_builder-12.4:latest'
							registryUrl 'https://hub.globalvirtual.world'
							registryCredentialsId 'docker-hub'
							alwaysPull true
							reuseNode true
						}
					}
					environment {
						pipeline = 'cd'
					}
					steps {
						echo 'Running inside docker'
						sh 'node -v'
						sh 'npm prune'
						sh 'npm install'
						sh 'npm run lint'
						sh 'npm run build'
					}
				}
				stage('Dockerize') {
					environment {
						BUILD_REVISION = sh(script: 'hg id -i', , returnStdout: true).take(12)
					}		    
					steps {
					    sh 'echo COMPOSE_PROJECT_NAME=xr_ui >> docker/.env'
					    sh 'echo BUILD_REVISION=$BUILD_REVISION >> docker/.env'
						sh 'docker-compose -f docker/dev.yml down -v'
						sh 'docker-compose -f docker/dev.yml rm -f -v'
						sh 'docker-compose -f docker/dev.yml build --no-cache --force-rm'
						//sh 'docker-compose -f docker/dev.yml push'
						sh 'docker-compose -f docker/dev.yml up -d'
					}
				}
			}
		}
	}
}