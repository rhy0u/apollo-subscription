export function wrapDockerCommand(command) {
  if (!process.env.CI) {
    return `docker-compose run postgres ${command}`
  }

  return command
}
