import './styles.scss';
import Registration from './Pages/Registration/Registration';
// import Login from './Pages/Login/Login';
// import { generalData } from './constants/registration';

// const registration = new Registration(document.body);

//registration.fillForm(generalData);
document.body.append(new Registration().render());

// new Login(document.body);
