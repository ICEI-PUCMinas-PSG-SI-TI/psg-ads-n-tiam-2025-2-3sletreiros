const path = require("path")

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  const aliases = {
    "@components": "./src/components",
    "@screens": "./src/screens",
    "@assets": "./assets",
    "@hooks": "./src/hooks",
    "@theme": "./src/theme",
    "@navigation": "./src/navigation",
    "@config": "./src/config",
    "@utils": "./src/utils",
    "@contexts": "./src/contexts",
    "@modules": "./src/modules",
    "@routes": "./src/routes"
  }

  root.find(j.ImportDeclaration).forEach(pathImport => {
    const importPath = pathImport.node.source.value

    if (!importPath.startsWith(".")) return

    const absoluteSource = path.resolve(fileInfo.path, "..", importPath)

    Object.entries(aliases).forEach(([alias, folderPath]) => {
      const absoluteAliasFolder = path.resolve(folderPath)

      if (absoluteSource.startsWith(absoluteAliasFolder)) {
        const newPath = alias + absoluteSource.replace(absoluteAliasFolder, "")
        pathImport.node.source.value = newPath.replace(/\\/g, "/")
      }
    })
  })

  return root.toSource()
}
