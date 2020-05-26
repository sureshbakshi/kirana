import * as React from "react";
// import { Link } from "react-router-dom";
// import {TERMS_JSON} from '../../utils/constants';
class Item extends React.Component<any,any> {
rederHtml(obj){
      return Object.keys(obj).map((key, i) => {
        if(key == 'items')
          return null
        else if(key == 'a')
          return (<> <a rel="noopener noreferrer"  href={obj[key][1]} className='link' target="_blank">{obj[key][0]}</a> </> )
        else
          return <span className={key}>{obj[key]}</span>
      })
      }
      render() {
        return <li>
          {this.rederHtml(this.props.itemObj)}
          { this.props.children }
      </li>
    }
  }
  
  class HtmlParser extends React.Component <any, any>{
      constructor(props) {
        super(props);
    }
    
    list(data) {
        const children = (items) => {
          if (items) {
            return <ol>{ this.list(items) }</ol>
        }
      }
      
      return data.map((itemObj, index) => {
        return <Item key={Date.now()+index} {...{itemObj}}>
          { children(itemObj.items) }
        </Item>
      })
    }
    
    render() {
        return <ul>
          { this.list(this.props.htmlObj) }
      </ul>
    }
  }
  export default HtmlParser;