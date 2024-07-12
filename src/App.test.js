import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './component/Header/Header';  //import component
Enzyme.configure({ adapter: new Adapter() });


test('description of test case',()=>{
  const copyOfComponent = shallow(<Header/>)  //copy the component to work on it using shallow
  expect(copyOfComponent.find('element-name').text()).toContain("here output expected")
})


test('description of test case',()=>{
  const copyOfComponent = shallow(<Header props={'koushik'}/>)  //copy the component to work on it using shallow
  expect(copyOfComponent.find('id').text()).toBe("here output expected")
})

test('description of test case',()=>{
  const copyOfComponent = shallow(<Header props={'koushik'}/>)  //copy the component to work on it using shallow
  copyOfComponent.find('element-r-id').simulate('click')  //simulate will perform action inside that or trigger the event
  expect(copyOfComponent.find('id').text()).toBe("here output expected")
})