// import Enzyme,{shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Header from './component/Header/Header';  //import component
// Enzyme.configure({ adapter: new Adapter() });
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './component/Login/Login';



// // test('description of test case',()=>{
// //   const copyOfComponent = shallow(<Header/>)  //copy the component to work on it using shallow
// //   expect(copyOfComponent.find('element-name').text()).toContain("here output expected")
// // })


// // test('description of test case',()=>{
// //   const copyOfComponent = shallow(<Header props={'koushik'}/>)  //copy the component to work on it using shallow
// //   expect(copyOfComponent.find('id').text()).toBe("here output expected")
// // })

// // test('description of test case',()=>{
// //   const copyOfComponent = shallow(<Header props={'koushik'}/>)  //copy the component to work on it using shallow
// //   copyOfComponent.find('element-r-id').simulate('click')  //simulate will perform action inside that or trigger the event
// //   expect(copyOfComponent.find('id').text()).toBe("here output expected")
// // })

// it('should toggle the dropdown on profile icon click', () => {
//   const copyOfComponent = shallow(<Header />)  //copy the component to work on it using shallow
//   expect(copyOfComponent.find('.header-dropdown-box').exists()).toBe(false);
//   copyOfComponent.find('.header-profile-logo-inner-cnt').simulate('click');
//   expect(copyOfComponent.find('.header-dropdown-box').exists()).toBe(true);
// });

// it('should render icons', () => {
//   const copyOfComponent = shallow(<Header />)  //copy the component to work on it using shallow
//   expect(copyOfComponent.find(SearchIcon).exists()).toBe(true);
//   expect(copyOfComponent.find(RefreshIcon).exists()).toBe(true);
//   expect(copyOfComponent.find(ViewStreamIcon).exists()).toBe(true);
//   expect(copyOfComponent.find(SettingsIcon).exists()).toBe(true);
//   expect(copyOfComponent.find(AppsIcon).exists()).toBe(true);
// });

describe('login component', () => {
  it('should render the login form', () => {
    render(<Login />);
    expect(screen.getByText('Fundo')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Use your Fundo Account')).toBeInTheDocument();
  });
  it('should switch to password reset on Forgot password click', () => {
    render(<Login />);
    const forgotPasswordLink = screen.getByText(/Forgot password/i);
    fireEvent.click(forgotPasswordLink);
    expect(screen.getByText('To reset password')).toBeInTheDocument();
});
})