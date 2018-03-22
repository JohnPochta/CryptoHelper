import { combineReducers } from 'redux';
import Info from './Info.js';
import PairSelect from './PairSelect.js';
import Manager_Stats from './Manager/Stats.js';
import Fantastic_Table_Statistics from './Manager/Fantastic_Table_Statistics.js';
import AnalizatorTable from './AnalizatorPage/AnalizatorTable.js';
import AccordionState from './AnalizatorPage/AccordionState.js';
import MainPage from './MainPage/MainPage.js';
import MainPageSignUpForm from './MainPage/SignUpForm.js';
import MainPageLoginForm from './MainPage/LoginForm.js';
import Menu from './Menu/Menu.js';
import AnalizatorInfo from './AnalizatorPage/AnalizatorInfo.js';

export default combineReducers({
	Info,
	PairSelect,
	Manager_Stats,
	Fantastic_Table_Statistics,
	AnalizatorTable,
	AccordionState,
	MainPage,
	MainPageSignUpForm,
	MainPageLoginForm,
	Menu,
	AnalizatorInfo,
});