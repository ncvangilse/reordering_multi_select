import {MultiSelectView, MultiSelect} from "models/widgets/multiselect";
import {register_models} from "base";

export class ReorderingMultiSelectView extends MultiSelectView {
  render() {
  super.render();

  // Create a container for the buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.width = '100%'; // Set the container width

  // Add button for moving up
  const upButton = document.createElement('button');
  upButton.innerHTML = '&#9650;'; // Unicode for up triangle
  upButton.style.width = '50%'; // Set the button width
  // upButton.style.fontSize = '20px'; // Increase the font size
  upButton.style.padding = '5px'; // Add some padding
  upButton.disabled = true; // Disable at initialization
  upButton.addEventListener('click', () => this.moveSelected(-1));
  buttonContainer.appendChild(upButton);

  // Add button for moving down
  const downButton = document.createElement('button');
  downButton.innerHTML = '&#9660;'; // Unicode for down triangle
  downButton.style.width = '50%'; // Set the button width
  // downButton.style.fontSize = '20px'; // Increase the font size
  downButton.style.padding = '5px'; // Add some padding
  downButton.disabled = true; // Disable at initialization
  downButton.addEventListener('click', () => this.moveSelected(1));
  buttonContainer.appendChild(downButton);

  // Append the container to the group element
  this.group_el.appendChild(buttonContainer);

  // Store the buttons for later use
  this.upButton = upButton;
  this.downButton = downButton;


    // Update the button states based on the current selection
    this.connect(this.model.change, () => this.updateButtonStates());
  }

  updateButtonStates() {
    // Get the current value (selected items)
    const value = this.model.value;

    // Get the indices of the selected items
    const selectedIndices = value.map(v => this.model.options.indexOf(v));

    // Find the uppermost and lowermost selected indices
    const uppermostSelectedIndex = Math.min(...selectedIndices);
    const lowermostSelectedIndex = Math.max(...selectedIndices);

    // Disable the up button if the uppermost selected item is at the top, enable it otherwise
    this.upButton.disabled = uppermostSelectedIndex === 0;

    // Disable the down button if the lowermost selected item is at the bottom, enable it otherwise
    this.downButton.disabled = lowermostSelectedIndex === this.model.options.length - 1;
  }


  moveSelected(direction) {
    // Get the current value (selected items)
    const value = this.model.value;

    // Get the indices of the selected items
    const selectedIndices = value.map(v => this.model.options.indexOf(v));

    // Sort the selected indices
    selectedIndices.sort((a, b) => a - b);

    // Create a copy of the options
    const newOptions = [...this.model.options];

    if (direction === -1) {
      // Moving up
      for (const selectedIndex of selectedIndices) {
        if (selectedIndex > 0) {
          // Swap the selected item with the item above it
          [newOptions[selectedIndex], newOptions[selectedIndex - 1]] = [newOptions[selectedIndex - 1], newOptions[selectedIndex]];
        }
      }
    } else {
      // Moving down
      for (let i = selectedIndices.length - 1; i >= 0; i--) {
        const selectedIndex = selectedIndices[i];
        if (selectedIndex < newOptions.length - 1) {
          // Swap the selected item with the item below it
          [newOptions[selectedIndex], newOptions[selectedIndex + 1]] = [newOptions[selectedIndex + 1], newOptions[selectedIndex]];
        }
      }
    }

    // Update the options and value to trigger a re-render
    this.model.options = newOptions;
    this.model.value = value.map(v => newOptions[newOptions.indexOf(v)]);
    this.updateButtonStates();
  }


}

export class ReorderingMultiSelect extends MultiSelect {
  static __name__ = "ReorderingMultiSelect"
  static {
    this.prototype.default_view = ReorderingMultiSelectView;
  }
}

// register_models({ReorderingMultiSelect: ReorderingMultiSelect});
