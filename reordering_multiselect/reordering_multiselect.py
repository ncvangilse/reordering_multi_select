from bokeh.models import MultiSelect
import panel as pn

class ReorderingMultiSelect(MultiSelect):
    __implementation__ = 'reordering_multiselect.js'

class ReorderingMultiSelectPanel(pn.widgets.MultiSelect):
    _widget_type = ReorderingMultiSelect

if __name__ == '__main__':
    w  = ReorderingMultiSelectPanel()
    w.options = ['a', 'b', 'c']
    w.show()