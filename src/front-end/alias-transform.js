const path = require("path")

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  const aliases = {
    "@components": "./src/components",
    "@screens": "./src/screens",
    "@assets": "./assets",
    "@hooks": "./src/hooks",
    "@utils": "./src/utils",
    "@services": "./src/services"
  }

  root.find(j.ImportDeclaration).forEach(pathImport => {
    const value = pathImport.node.source.value

    if (!value.startsWith(".")) return

    Object.entries(aliases).forEach(([alias, folder]) => {
      const resolved = path.resolve(fileInfo.path, "..", value)
      const normalizedFolder = path.resolve(folder)

      if (resolved.startsWith(normalizedFolder)) {
        const newPath = alias + resolved.replace(normalizedFolder, "")
        pathImport.node.source.value = newPath.replace(/\\/g, "/")
      }
    })
  })

  return root.toSource()
}
