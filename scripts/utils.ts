const fs = require('fs')
const path = require('path')

interface PkgInfo {
  path: string
}

const packagesMap = new Map<string, PkgInfo>()

const excludeDirs = ['__test__', 'lib', 'dist']

const getAllPackages = () => {
  // store all packages
  const packagesPath = path.resolve(__dirname, '../packages/lib')

  const getTargetDir = dirPath => {
    const files = fs.readdirSync(dirPath).filter(dir => !excludeDirs.includes(dir))
    files.forEach(file => {
      const filePath = path.join(dirPath, file)
      const fileStat = fs.statSync(filePath)
      if (fileStat.isDirectory()) {
        const pkgPath = fs.readdirSync(filePath).find(item => item === 'package.json')
        if (pkgPath) {
          // find package.json
          const resPkg = require(path.join(filePath, pkgPath))
          if (resPkg) {
            // pkg name
            packagesMap.set(resPkg.name, {
              path: filePath,
            })
          }
        } else {
          getTargetDir(filePath)
        }
      }
    })
  }
  getTargetDir(packagesPath)
}

getAllPackages()

exports.getTarget = pkgName => {
  if (!packagesMap.has(pkgName)) {
    throw new Error(`cannot find ${pkgName}, please check.`)
  }

  return packagesMap.get(pkgName)
}

exports.packages = packagesMap.keys()
