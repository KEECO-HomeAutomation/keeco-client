import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
	palette: {
		primary: teal,
		secondary: blue
	},
	typography: {
		useNextVariants: true
	}
});

export default theme;
