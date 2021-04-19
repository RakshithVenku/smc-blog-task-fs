import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import LazyLoad from 'react-lazyload'
import Spinner from './Spinner'


const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);



// -------AccordianList Component-------
const AccordianList = (props) => {
  const {blogData} = props
  const [expanded, setExpanded] = React.useState('panel0');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div style={{margin: '40px 40px 0px 40px'}}>
        {blogData.map((blog,i) => {
            if(i >= 15){
                return (
                    <LazyLoad
                       key={i} 
                       height={100}
                       offset={[-100, 100]}
                       placeholder={<Spinner />}
                    >
                    <Accordion  style={{marginBottom: '10px'}} square expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${i}d-content`} id={`panel${i}d-header`}>
                       <Typography>{i + 1}. {blog.title[0]}</Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                         <ul>
                       <li><Typography>{blog.description[0]}</Typography></li>
                       <li><Typography>{blog.link[0]}</Typography></li>
                       <li><Typography>{blog.pubDate[0]}</Typography></li>
                       </ul>
                     </AccordionDetails>
                    </Accordion>
                    </LazyLoad>
                )
            }else{
                return (
                    <Accordion key={i}  style={{marginBottom: '10px'}} square expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                     <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${i}d-content`} id={`panel${i}d-header`}>
                       <Typography>{i + 1}. {blog.title[0]}</Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                         <ul>
                       <li><Typography>{blog.description[0]}</Typography></li>
                       <li><Typography>{blog.link[0]}</Typography></li>
                       <li><Typography>{blog.pubDate[0]}</Typography></li>
                       </ul>
                     </AccordionDetails>
                    </Accordion>
                )

            }
            
        })}
    </div>
  );
}


export default AccordianList

