(function executeAction() {
  
    var checkedItems = gs.action.getGlideURI().get("sysparm_checked_items");

    if (!checkedItems) {
        gs.addErrorMessage("No rows chosen.");
        return;
    }

    var gr = new GlideRecord("task_cmdb_ci_service");
    gr.addQuery("sys_id", "IN", checkedItems);
    gr.query();

    var deleted = 0;

    while (gr.next()) {
        gr.deleteRecord();
        deleted++;
    }

    gs.addInfoMessage(deleted + " Connection(s) removed");

})();
