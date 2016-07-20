let objectIds = 0;

class QObject {
  constructor(parent) {
    this.$parent = parent;
    if (parent && parent.$tidyupList) {
      parent.$tidyupList.push(this);
    }

    // List of things to tidy up when deleting this object.
    this.$tidyupList = [];
    this.$properties = {};

    this.objectId = objectIds++;
  }

  $delete() {
    if (this.$Component) {
      this.$Component.destruction();
    }

    while (this.$tidyupList.length > 0) {
      const item = this.$tidyupList[0];
      if (item.$delete) {
        // It's a QObject
        item.$delete();
      } else {
        // It must be a signal
        item.disconnect(this);
      }
    }

    for (const i in this.$properties) {
      const prop = this.$properties[i];
      while (prop.$tidyupList.length > 0) {
        prop.$tidyupList[0].disconnect(prop);
      }
    }

    if (this.$parent && this.$parent.$tidyupList) {
      this.$parent.$tidyupList.splice(this.$parent.$tidyupList.indexOf(this), 1);
    }

    // must do this:
    // 1) parent will be notified and erase object from it's children.
    // 2) DOM node will be removed.
    this.parent = undefined;
  }

  // must have a `destroy` method
  // http://doc.qt.io/qt-5/qtqml-javascript-dynamicobjectcreation.html
  destroy() {
    this.$delete();
  }
}

QObject.prototype.$toString = function(...args) {
    return `${this.constructor.name}(${args.join(', ')})`;
};
