
class MyComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      textFilter: null
    }
  }

  handlePageChange(page) {
    this.setState({ page: page })
  }

  handleFilter(filterObj) {
    console.debug(filterObj)
    if(filterObj.value) {
      this.setState({textFilter: filterObj.value.value})
    }
    else {
      this.setState({textFilter: null})
    }

  }

  render() {

    const tableOptions = {
      onSortChange: () => {},
      onPageChange: this.handlePageChange.bind(this),
      onFilterChange: this.handleFilter.bind(this),
      onSizePerPageList: () => {},
      sizePerPage: this.props.pageSize,
      sizePerPageList: [5, 10, 25, 50],
      page: this.state.page
    }

    const startOffset = (this.state.page-1)*this.props.pageSize
    const endOffset = startOffset+this.props.pageSize
    const filteredData = this.props.data
      .filter(d => this.state.textFilter===null || d.value.includes(this.state.textFilter))
    const effectiveData = filteredData
      .slice(startOffset, endOffset)

    return React.createElement(
      BootstrapTable,
      {
        data: effectiveData,
        options: tableOptions,
        pagination: true,
        fetchInfo: { dataTotalSize: filteredData.length },
        remote: true,
        striped: true, hover: true, bordered: false, condensed: true
      },
      React.createElement(
        TableHeaderColumn,
        { dataField: "key", isKey: true },
        "Key"
      ),
      React.createElement(
        TableHeaderColumn,
        { dataField: "value",
          filter: { type: 'TextFilter' }
        },
        "Value"
      )
    )
  }
}

const data = [
  { key: 1, value: 'value1' },
  { key: 2, value: 'value2' },
  { key: 3, value: 'value3' },
  { key: 4, value: 'value4' },
  { key: 5, value: 'value5' },
  { key: 6, value: 'value6' },
  { key: 7, value: 'value7' }
]

const root=document.querySelector("#app")
ReactDOM.render(React.createElement(MyComponent, { data: data, dataSize: 7, pageSize: 5 }), root)
