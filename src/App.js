import React, { Component } from "react";
import {
  Tabs,
  TabList,
  Tab,
  PanelList,
  Panel,
  ExtraButton
} from "react-tabtab";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    const tabs = [
      { title: " Tab1", content: "New Content1" },
      { title: " Tab2", content: "New Content2" },
      { title: " Tab3", content: "New Content3" }
    ];

    this.state = {
      tabs,
      activeIndex: 0,
      modal: false
    };
  }

  handleExtraButton = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleTabChange = index => {
    this.setState({ activeIndex: index });
  };

  handleEdit = ({ type, index }) => {
    this.setState(state => {
      let { tabs, activeIndex } = state;
      if (type === "delete") {
        tabs = [...tabs.slice(0, index), ...tabs.slice(index + 1)];
      }
      if (index - 1 >= 0) {
        activeIndex = index - 1;
      } else {
        activeIndex = 0;
      }
      return { tabs, activeIndex };
    });
  };

  addMoreTab = () => {
    const { tabs } = this.state;
    const newTabs = [...tabs, { title: "New Tab", content: "New Content" }];
    this.setState({ tabs: newTabs, activeIndex: newTabs.length - 1 });
  };

  render() {
    const { tabs, activeIndex, modal } = this.state;
    const tabTemplate = [];
    const panelTemplate = [];

    tabs.forEach((tab, i) => {
      const closable = tabs.length > 1;
      tabTemplate.push(
        <Tab key={i} closable={closable}>
          {tab.title}
        </Tab>
      );
      panelTemplate.push(<Panel key={i}>{tab.content}</Panel>);
    });
    return (
      <React.Fragment>
        <div>
          <Modal isOpen={modal}>
            <ModalBody>
              <Button onClick={this.addMoreTab}>Add tab</Button>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleExtraButton} color="secondary">
                Close
              </Button>
            </ModalFooter>
          </Modal>

          <Tabs
            onTabEdit={this.handleEdit}
            onTabChange={this.handleTabChange}
            activeIndex={activeIndex}
            customStyle={this.props.customStyle}
            ExtraButton={
              <ExtraButton onClick={this.handleExtraButton}>
                <span>+</span>
              </ExtraButton>
            }
          >
            <TabList>{tabTemplate}</TabList>
            <PanelList>{panelTemplate}</PanelList>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}
