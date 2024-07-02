import subprocess
import sys

VALID_ENVIRONMENTS = ['dev', 'test', 'sand', 'prod']

def deploy_to_aws(environment):
    # Install aws-crt-nodejs
    install_command = f"npm install && mkdir -p layers/aws-crt-nodejs && cp node_modules/aws-crt/dist/bin/linux-x64-glibc/aws-crt-nodejs.node layers/aws-crt-nodejs"
    subprocess.run(install_command, shell=True, check=True)

    # Build
    build_command = f"sam build --config-env {environment}"
    subprocess.run(build_command, shell=True, check=True)

    # Deploy
    deploy_command = f"sam deploy --config-env {environment}"
    subprocess.run(deploy_command, shell=True, check=True)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python deploy.py <environment>")
        sys.exit(1)

    deploy_environment = sys.argv[1]

    if deploy_environment not in VALID_ENVIRONMENTS:
        print("Invalid environment. Valid environments are: dev, test, sand, prod")
        sys.exit(1)

    deploy_to_aws(deploy_environment)
