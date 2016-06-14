registerQmlType({
  module: "QtQuick",
  name: "PropertyChanges",
  versions: /.*/,
  baseClass: "QtQml.QtObject"
}, class {
  constructor(meta) {
    callSuper(this, meta);

    createProperty("QtObject", this, "target");
    createProperty("bool", this, "explicit");
    createProperty("bool", this, "restoreEntryValues", {initialValue: true});

    this.$actions = [];

    this.$setCustomData = function(propName, value) {
        this.$actions.push({
            property: propName,
            value: value
        });
    }
  }
});
