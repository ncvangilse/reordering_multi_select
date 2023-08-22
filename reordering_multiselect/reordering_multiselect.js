// import {MultiSelectView, MultiSelect} from "@bokehjs/models/widgets/multiselect";
// import {register_models} from "@bokehjs/base";

// import {register_models} from "base";
// import {MultiSelectView, MultiSelect} from "models/widgets/multiselect"

import {Models} from "base";

import {MultiSelectView, MultiSelect} from "models/widgets/multiselect";



export class ReorderingMultiSelectView extends MultiSelectView {
  render() {
    super.render();

    // Add buttons for reordering
    const upButton = document.createElement('button');
    upButton.textContent = 'Up';
    upButton.addEventListener('click', () => this.moveSelected(-1));

    const downButton = document.createElement('button');
    downButton.textContent = 'Down';
    downButton.addEventListener('click', () => this.moveSelected(1));

    this.group_el.appendChild(upButton);
    this.group_el.appendChild(downButton);

    // Update the button states based on the current selection
    this.updateButtonStates();
  }

  updateButtonStates() {
  // Get the current value (selected items)
  const value = this.model.value;

  // Get the index of the first selected item
  const selectedIndex = value.length > 0 ? this.model.options.indexOf(value[0]) : -1;

  // Disable the up button if the first item is selected, enable it otherwise
  this.upButton.disabled = selectedIndex === 0;

  // Disable the down button if the last item is selected, enable it otherwise
  this.downButton.disabled = selectedIndex === this.model.options.length - 1;
  }

  moveSelected(direction) {
    // Get the current value (selected items)
    const value = this.model.value;

    // Get the index of the first selected item
    const selectedIndex = value.length > 0 ? this.model.options.indexOf(value[0]) : -1;

    // If no item is selected or only one item is in the list, do nothing
    if (selectedIndex === -1 || this.model.options.length <= 1) return;

    // Calculate the new index based on the direction
    const newIndex = Math.max(0, Math.min(this.model.options.length - 1, selectedIndex + direction));

    // Create a copy of the options and swap the selected item with the item in the new position
    const newOptions = [...this.model.options];
    [newOptions[selectedIndex], newOptions[newIndex]] = [newOptions[newIndex], newOptions[selectedIndex]];

    // Update the options and value to trigger a re-render
    this.model.options = newOptions;
    this.model.value = value.map(v => newOptions[newOptions.indexOf(v)]);
    this.updateButtonStates();
  }

}

export class ReorderingMultiSelect extends MultiSelect {
  static init_ReorderingMultiSelect() {
    this.prototype.default_view = ReorderingMultiSelectView;
  }
}

ReorderingMultiSelect.init_ReorderingMultiSelect();

Models.register_models({ReorderingMultiSelect: ReorderingMultiSelect});

