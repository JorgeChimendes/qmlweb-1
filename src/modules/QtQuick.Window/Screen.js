registerQmlType({
  module: "QtQuick.Window",
  name: "Screen",
  versions: /.*/,
  baseClass: "QtQuick.Item",
  properties: {
    name: "string",
    orientation: "enum",
    orientationUpdateMask: "enum",
    primaryOrientation: "enum",
    pixelDensity: "real",
    devicePixelRatio: "real",
    desktopAvailableHeight: "int",
    desktopAvailableWidth: "int",
    height: "int",
    width: "int"
  }
}, class {
  constructor(meta) {
    callSuper(this, meta);
    // TODO: rewrite as an attached object and forbid constructing
  }
  Component$onCompleted() {
    this.desktopAvailableHeight = window.outerHeight;
    this.desktopAvailableWidth = window.outerWidth;
    this.devicePixelRatio = window.devicePixelRatio;
    this.height = window.innerHeight;
    this.name = this.name;
    this.orientation = Qt.PrimaryOrientation;
    this.orientationUpdateMask = 0;
    this.pixelDensity = 100.0;  // TODO
    this.primaryOrientation = Qt.PrimaryOrientation;
    this.width = window.innerWidth;
  }
});
