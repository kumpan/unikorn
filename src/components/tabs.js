import React, { Component }  from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import SecondaryButton from "../components/buttons/secondary.js"

class TabsComponent extends Component {  
  render() {
    const allTabs = this.props.tabs

    const tabs = allTabs.length ? (
      allTabs.map(({ tab_title }, i) => {
        return (
          <Tab key={i}>{tab_title}</Tab>
        )
      })
    ) : (
      null
    )
  
    const tabElements = allTabs.length ? (
      allTabs.map(({ heading, text, buttontext, buttontext_mobile, buttonlink, person }, i) => {
        return (
          <TabPanel key={i}>
            <div>
              <h2>{heading}</h2>
              <p>{text}</p>
              {person &&
                <em>- {person}</em>
              }
              {buttonlink &&
                <div>
                  <SecondaryButton text={buttontext} mobileBtn={buttontext_mobile} link={buttonlink} />
                </div>
              }
            </div>
          </TabPanel>
        )
      })
    ) : (
      null
    )

    return (
      <Tabs>
        <TabList>
          {tabs}
        </TabList>
        {tabElements}
      </Tabs>
    )
  }
}

export default TabsComponent