/* eslint-disable no-debugger */
import {
    defineWidget,
    log,
    runCallback,
    findElement,
} from 'widget-base-helpers';

import registry from 'dijit/registry';

export default defineWidget('DataGridDynamicLabel', false, {

    _obj: null,
    _grid: null,

    constructor() {
        this.log = log.bind(this);
        this.runCallback = runCallback.bind(this);
    },

    postCreate() {
        log.call(this, 'postCreate', this._WIDGET_VERSION);
    },

    update(obj, callback) {
        if (obj) {
            this._contextObj = obj;
        }

        this._gridNode = findElement(".mx-name-" + this.gridName, this.domNode.parentNode);
        this._grid = registry.byNode(this._gridNode);
        /* Instead of aspect.after, we need to find the headers and re-name.
        refreshGrid happens each time the grid loads, but suspect that we simply
        can wait and modify the grid directly based on loadign sructure of the widgets.
		*/
        //aspect.after(this._grid, "refreshGrid", this._evalRules.bind(this))
        this._renameColumnHeader();

        if(callback) {callback();}
    },
    _renameColumnHeader() {
        debugger;
        for(const column of this.columns){
        //set inner label
            this._grid._gridColumnNodes[ column.columnIndex ].children[ 0 ].children[ 1 ].innerText =
                this._contextObj.get(column.labelAttr);
            //set label
            this._grid._gridColumnNodes[ column.columnIndex ].title = this._contextObj.get(column.labelAttr);
        }
    },

});
