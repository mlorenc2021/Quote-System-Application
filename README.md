# 467 group project
## Dependencies
- Install [Nodejs](https://nodejs.org/en/) 
via [NVM](https://github.com/nvm-sh/nvm#install--update-script)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Installing
### Clone the Repo
- SSH is prefered `git clone git@github.com:Ryan-Jeziorski/csci_467_group_project.git`
- https if you need to `git clone https://github.com/Ryan-Jeziorski/csci_467_group_project.git`

### .env File Format
You will need to have a .env file that looks like this.
No passwords are stored in the code itself, and this .env file
should never be pushed to the repo for security purposes.
```config
LEGACY_DB_HOST=
LEGACY_DB_DIALECT=
LEGACY_DB_NAME=
LEGACY_DB_USER=
LEGACY_DB_PASS=

PROJECTEMAIL=
PROJECTPASS=

SESSION_SECRET=

```
### Install
```
$ npm install
```
### Initialize Database
```
npx sequelize-cli db:migrate 
npx sequelize-cli db:seed:all
```
### Run
You will find the program running at `localhost:3000/`
```
$ npm start
```
### Login Credentials
Username: sales
Password: sales

Username: accountant
Password: accountant

Username: manager
Password: manager

Username: admin
Password: admin

