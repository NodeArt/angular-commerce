const fs = require('fs'),
      path = require('path');

let exec = require('child_process').exec;

const newVersion = process.argv[2] || "1.0.0",
      scope = process.argv[3] || '@nodeart';

const blackListDirs = [
    '.git',
    'nodeart-component-loader'
];

let getDirectories = () => {
    return fs.readdirSync(path.join(__dirname, 'modules'))
        .filter( item => fs.statSync(path.join(__dirname, 'modules', item)).isDirectory() && blackListDirs.indexOf(item) === -1);
};

let changeVersions = (directories) => {
    directories.forEach( (directory) => {
        let packageJsonFile = fs.readFileSync(path.join(__dirname, 'modules', directory, 'package.json'));
        let packageJsonObj = JSON.parse(packageJsonFile);
        packageJsonObj.version = newVersion;
        if(packageJsonObj.dependencies) {
            let dependencies = packageJsonObj.dependencies;
            Object.keys(dependencies).map((dependency) => {
                if(dependency.indexOf(scope) !== -1){
                    dependencies[dependency] = newVersion;
                }
            });
        }
        fs.writeFile(path.join(__dirname, 'modules', directory, 'package.json'), JSON.stringify(packageJsonObj, null, 2));
    });
};

let publishOnline = (directories) => {
    directories.forEach( (directory) => {
        exec(`cd modules/${directory}  && git add . && git commit -m "Updated to ${newVersion} version" && git push origin master && npm publish --access=public `, (err, stdout, stderr) => {
            if(stderr){
                console.log(stderr);
            } else {
                console.log(stdout);
            } 
        });
    });
};

let updateVersions = (newVersion, scope) => {
    let directories = getDirectories();
    changeVersions(directories);
    publishOnline(directories);
};



updateVersions(newVersion, scope);

module.exports = {
    updateVersions: updateVersions
}
