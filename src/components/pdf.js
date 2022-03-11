
import React from 'react';


class PDF extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pdf: null,
      scale: 1.2
    }
  }
  getChildContext () {
    return {
      pdf: this.state.pdf,
      scale: this.state.scale
    }
  }
  componentDidMount () {
    PDFJS.getDocument(this.props.src).then((pdf) => {
      console.log(pdf)
      this.setState({ pdf })
    })
  }
  render () {
    return (<div className='pdf-context'>{this.props.children}</div>) 
  }
}

PDF.propTypes = {
  src: React.PropTypes.string.isRequired
}

PDF.childContextTypes = {
  pdf: React.PropTypes.object,
  scale: React.PropTypes.number
}

class Page extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: 'N/A',
      page: null,
      width: 0,
      height: 0
    }
  }
  shouldComponentUpdate (nextProps, nextState, nextContext) {
    return this.context.pdf != nextContext.pdf || this.state.status !== nextState.status
  }
  componentDidUpdate (nextProps, nextState, nextContext) {
    this._update(nextContext.pdf) 
  }
  componentDidMount () {
    this._update(this.context.pdf) 
  }
  _update (pdf) {
    if (pdf) {
      this._loadPage(pdf)
    } else {
      this.setState({ status: 'loading' }) 
    }
  }
  _loadPage (pdf) {
    if (this.state.status === 'rendering' || this.state.page != null) return; 
    pdf.getPage(this.props.index).then(this._renderPage.bind(this))
    this.setState({ status: 'rendering' })
  } 
  _renderPage (page) {
    console.log(page)
    let { scale } = this.context 
    let viewport = page.getViewport(scale)
    let { width, height } = viewport
    let canvas = this.refs.canvas
    let context = canvas.getContext('2d')
    console.log(viewport.height, viewport.width)
    canvas.width = width
    canvas.height = height
    
    page.render({
      canvasContext: context,
      viewport
    })
    
    this.setState({ status: 'rendered', page, width, height })
  }
  render () {
    let { width, height, status } = this.state
    return (
      <div className={`pdf-page ${status}`} style={{width, height}}>
        <canvas ref='canvas' />
      </div>
    )
  }
}

Page.propTypes = {
  index: React.PropTypes.number.isRequired
}
Page.contextTypes = PDF.childContextTypes

class Viewer extends React.Component {
  render () {
    let { pdf } = this.context
    let numPages = pdf ? pdf.pdfInfo.numPages : 0
    let fingerprint = pdf ? pdf.pdfInfo.fingerprint : 'none'
    let pages = Array.apply(null, { length: numPages })
      .map((v, i) => (<Page index={i + 1} key={`${fingerprint}-${i}`}/>))
    
    return (
      <div className='pdf-viewer'>
        {pages}
      </div>
    )
  }
}
Viewer.contextTypes = PDF.childContextTypes

React.render((
  <PDF src={PDF_URL}>
    <Viewer />
  </PDF>
), document.getElementById('container'))

