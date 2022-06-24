import { Container, TextField, Stack, Button, Grid, Snackbar, Typography, Divider, useMediaQuery, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { getCookie } from '../lib/cookie'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, FormControl, InputLabel, Select, MenuItem, Card, CardContent } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CurrentPatient from '../components/CurrentPatient'


var Highcharts = require('highcharts');
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);


export default function PhysicalExam() {

    let [patient, setPatient] = useState({})
    let navigate = useNavigate()
    let [open, setOpen] = useState(false)
    let [notes, setNotes] = useState('')
    let preventiveServicesList = {
        "1st injection": "First visit",
        "2nd injection": "4 weeks after 1st dose but 2 weeks before childbirth",
        "3rd injection": "6 months after 2nd dose",
        "4th injection": "1 year after 3rd inj/ subsequent pregnancy",
        "5th injection": "1 year after 4th inj/ subsequent pregnancy"
    }
    let maternalSerologyList = {
        "1st injection": "First visit",
        "2nd injection": "4 weeks after 1st dose but 2 weeks before childbirth",
        "3rd injection": "6 months after 2nd dose",
        "4th injection": "1 year after 3rd inj/ subsequent pregnancy",
        "5th injection": "1 year after 4th inj/ subsequent pregnancy"
    }
    let [serologyList, setSerologyList] = useState([])
    let [preventiveServiceList, setPreventiveServiceList] = useState([])
    let [visit, setVisit] = useState()
    let [notesDisplay, setNotesDisplay] = useState('')
    let [data, setData] = useState({})
    let [preventiveServices, setPreventiveServices] = useState(null)
    let [preventiveService, setPreventiveService] = useState(null)
    let [maternalSerology, setMaternalSerology] = useState(null)
    let [contact, setContact] = useState(null)
    let [message, setMessage] = useState(false)
    let isMobile = useMediaQuery('(max-width:600px)');

    const [value, setValue] = useState('1');

    let saveClinicalNotes = async () => {
        setNotesDisplay(notesDisplay + "\n" + notes)
        setNotes('')
        return
    }
    let saveSerologyResults = async () => {


        return
    }

    let saveSuccessfully = async () => {
        setMessage("Data saved successfully")
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 2000)
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // useEffect(() => )
    useEffect(() => {
        let visit = window.localStorage.getItem("currentPatient")
        if (!visit) { return }
        setVisit(JSON.parse(visit))
        return
    }, [])

    useEffect(() => {

        if (document.getElementById('container')) {
            Highcharts.chart('container',
                {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Weight Monitoring'
                    },
                    subtitle: {
                        text: 'Reload to refresh data'
                    },
                    xAxis: {
                        categories: ['4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26'],
                        title: {
                            text: 'Gestation in weeks'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Weight'
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        }
                    },
                    series: [{
                        name: 'Patient',
                        data: [70, 69, 69, 72, 73, 73, 72, 74, 76, 78, 77, 77]
                    }]
                }
            );
            return
        }
    }, [document.getElementById('container')])


    let saveObservation = async (patientId, code, observationValue) => {
        let response = await (await fetch('/patients', {
            body: JSON.stringify({})
        }))

        return
    }


    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Layout>
                    <Container sx={{ border: '1px white dashed' }}>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={open}
                            onClose={""}
                            message={message}
                            key={"loginAlert"}
                        />
                        {visit && <CurrentPatient data={visit} />}

                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    aria-label="scrollable auto tabs example">
                                    <Tab label="Physical Examination" value="1" />
                                    <Tab label="Weight Monitoring Chart" value="2" />
                                    <Tab label="Clinical Notes" value="3" />
                                    <Tab label="Preventive Services" value="4" />
                                    <Tab label="Maternal Serology" value="5" />



                                </TabList>
                            </Box>
                            <TabPanel value='1'>
                                {/* <p></p> */}
                                <Typography variant='p' sx={{ fontSize: 'large', fontWeight: 'bold' }}>General Examination</Typography>
                                <Divider />
                                <p></p>
                                <Grid container spacing={1} padding=".5em" >
                                    <Grid item xs={12} md={12} lg={3}>
                                        <TextField
                                            fullWidth="80%"
                                            type="text"
                                            label="Height"
                                            placeholder="Height"
                                            size="small"
                                            onChange={e => { setPatient({ ...patient, firstName: e.target.value }) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={3}>
                                        <TextField
                                            fullWidth="80%"
                                            type="text"
                                            label="Pre-gestational Weight"
                                            placeholder="Pre-gestational Weight"
                                            size="small"
                                            onChange={e => { setPatient({ ...patient, firstName: e.target.value }) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={3}>
                                        <TextField
                                            fullWidth="80%"
                                            type="text"
                                            label="Body Weight"
                                            placeholder="Body Weight"
                                            size="small"
                                            onChange={e => { setPatient({ ...patient, firstName: e.target.value }) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={3}>
                                        <TextField
                                            fullWidth="80%"
                                            type="text"
                                            label="BMI (auto-generated)"
                                            placeholder="BMI (auto-generated)"
                                            size="small"
                                            onChange={e => { setPatient({ ...patient, firstName: e.target.value }) }}
                                        />
                                    </Grid>

                                </Grid>
                                <Grid container spacing={1} padding=".5em" >
                                    <Grid item xs={12} md={12} lg={3}>
                                        <TextField
                                            fullWidth="80%"
                                            type="text"
                                            label="Systolic Blood Pressure"
                                            placeholder="Systolic Blood Pressure"
                                            size="small"
                                            onChange={e => { setPatient({ ...patient, firstName: e.target.value }) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={3}>
                                        <TextField
                                            fullWidth="100%"
                                            type="text"
                                            label="Diastolic Blood Pressure"
                                            placeholder="Diastolic Blood Pressure"
                                            size="small"
                                            onChange={e => { setPatient({ ...patient, inpatientNumber: e.target.value }) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={3}>
                                        <TextField
                                            fullWidth="100%"
                                            type="text"
                                            label="Pulse Rate"
                                            placeholder="Pulse Rate"
                                            size="small"
                                            onChange={e => { setPatient({ ...patient, inpatientNumber: e.target.value }) }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={3}>
                                        <TextField
                                            fullWidth="100%"
                                            type="text"
                                            label="CVS"
                                            placeholder="CVS"
                                            size="small"
                                            onChange={e => { setPatient({ ...patient, inpatientNumber: e.target.value }) }}
                                        />
                                    </Grid>
                                </Grid>

                                <Divider />
                                <p></p>
                                <Typography variant='p' sx={{ fontSize: 'large', fontWeight: 'bold' }}>Respiration</Typography>
                                <Grid container spacing={1} padding=".5em" >

                                    <Grid item xs={12} md={12} lg={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Respiration Exam Results</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={data.admittedFrom ? data.admittedFrom : "No"}
                                                label="Respiration Exam Results"
                                                onChange={handleChange}
                                                size="small"
                                                defaultValue={"Other"}
                                            >
                                                <MenuItem value={"Respiratory exam not done"}>Respiratory exam not done</MenuItem>
                                                <MenuItem value={"Yes"}>Normal Respiratory Exam Result</MenuItem>
                                                <MenuItem value={"No"}>Dyspnoea</MenuItem>
                                                <MenuItem value={"Yes"}>Cough</MenuItem>
                                                <MenuItem value={"Yes"}>Rapid breathing</MenuItem>
                                                <MenuItem value={"Yes"}>Slow breathing</MenuItem>
                                                <MenuItem value={"Yes"}>Wheezing</MenuItem>
                                                <MenuItem value={"Yes"}>Rales</MenuItem>
                                                <MenuItem value={"Other"}>Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <p></p>
                                <p></p>

                                <Stack direction="row" spacing={2} alignContent="right" >
                                    {(!isMobile) && <Typography sx={{ minWidth: '80%' }}></Typography>}
                                    <Button variant='contained' disableElevation sx={{ backgroundColor: 'gray' }}>Cancel</Button>
                                    <Button variant="contained" onClick={e => { saveSuccessfully() }} disableElevation sx={{ backgroundColor: "#632165" }}>Save</Button>
                                </Stack>
                                <p></p>

                            </TabPanel>

                            <TabPanel value='2'>
                                <Typography variant='p' sx={{ fontSize: 'large', fontWeight: 'bold' }}>Weight Monitoring</Typography>
                                <Divider />

                                <p></p>
                                <div id="container" style={{ width: "100%", height: "400px" }}></div>
                                <p></p>

                            </TabPanel>
                            <TabPanel value='3'>
                                <Typography variant='p' sx={{ fontSize: 'large', fontWeight: 'bold' }}>Clinical Notes</Typography>
                                <Divider />
                                <p></p>
                                <Typography variant='p' sx={{ fontSize: 'small', fontWeight: 'bold' }}>{notesDisplay}</Typography>

                                <Grid container spacing={1} padding=".5em" >
                                    <Grid item xs={12} md={12} lg={8}>
                                        <TextField
                                            fullWidth="80%"
                                            type="text"
                                            multiline
                                            minRows={3}
                                            label="Clinical Notes"
                                            placeholder="Clinical Notes"
                                            size="small"
                                            onChange={e => { setNotes(e.target.value) }}

                                        />
                                    </Grid>

                                </Grid>
                                <p></p>
                                <Divider />
                                <p></p>
                                <Stack direction="row" spacing={2} alignContent="right" >
                                    {(!isMobile) && <Typography sx={{ minWidth: '80%' }}></Typography>}
                                    <Button variant='contained' disableElevation sx={{ backgroundColor: 'gray' }}>Cancel</Button>
                                    <Button variant="contained" onClick={e => { saveClinicalNotes() }} disableElevation sx={{ backgroundColor: "#632165" }}>Save</Button>
                                </Stack>
                                <p></p>
                            </TabPanel>
                            <TabPanel value='4'>
                                <Typography variant='p' sx={{ fontSize: 'large', fontWeight: 'bold' }}>Preventive Services</Typography>
                                <Divider />
                                {preventiveService && <><p></p>
                                    <Typography variant='p' sx={{ padding: "1em" }}>{preventiveService}</Typography>
                                    <p></p>
                                </>}

                                <Grid container spacing={1} padding=".5em" >
                                    <Grid item xs={12} md={12} lg={8}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Tetanus Diphtheria (TD) injection</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={preventiveService ? preventiveService : ""}
                                                label="Tetanus Diphtheria (TD) injection"
                                                onChange={e => { setPreventiveService(e.target.value); console.log(e.target.value) }}
                                                size="small"
                                            >
                                                {Object.keys(preventiveServicesList).map((service) => {
                                                    return <MenuItem value={preventiveServicesList[service]}>{service}</MenuItem>

                                                })}
                                            </Select>
                                        </FormControl>

                                    </Grid>
                                </Grid>
                                <Divider />
                                <p></p>
                                <Grid container spacing={1} padding=".5em" >

                                    <Grid item xs={12} md={12} lg={4}>
                                        {!isMobile ? <DesktopDatePicker
                                            label="Date given"
                                            inputFormat="MM/dd/yyyy"
                                            // value={referral.dateGiven}
                                            onChange={e => { setPreventiveServices({ ...preventiveServices, dateGiven: e }) }}
                                            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                        /> :
                                            <MobileDatePicker
                                                label="Date given"
                                                inputFormat="MM/dd/yyyy"
                                                // value={referral.dateGiven }
                                                onChange={e => { setPreventiveServices({ ...preventiveServices, dateGiven: e }) }}
                                                renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                            />}
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={4}>
                                        {!isMobile ? <DesktopDatePicker
                                            label="Next visit"
                                            inputFormat="MM/dd/yyyy"
                                            // value={referral.nextVisitDate}
                                            onChange={e => { setPreventiveServices({ ...preventiveServices, nextVisitDate: e }) }}
                                            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                        /> :
                                            <MobileDatePicker
                                                label="Next visit"
                                                inputFormat="MM/dd/yyyy"
                                                // value={preventiveServices.nextVisitDate}
                                                onChange={e => { setPreventiveServices({ ...preventiveServices, nextVisitDate: e }) }}
                                                renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                            />}
                                    </Grid>

                                </Grid>
                                <p></p>
                                <Divider />
                                <p></p>
                                <Stack direction="row" spacing={2} alignContent="right" >
                                    {(!isMobile) && <Typography sx={{ minWidth: '80%' }}></Typography>}
                                    <Button variant='contained' disableElevation sx={{ backgroundColor: 'gray' }}>Cancel</Button>
                                    <Button variant="contained" onClick={e => { saveSuccessfully() }} disableElevation sx={{ backgroundColor: "#632165" }}>Save</Button>
                                </Stack>
                                <p></p>
                            </TabPanel>
                            <TabPanel value='5'>
                                <Typography variant='p' sx={{ fontSize: 'large', fontWeight: 'bold' }}>Maternal Serology</Typography>
                                <Divider />
                                {/* <p></p>
                                <Typography variant='p' sx={{ padding: "1em" }}>{contact}</Typography>
                                <p></p> */}

                                <Grid container spacing={1} padding=".5em" >
                                    <Grid item xs={12} md={12} lg={12}>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            onChange={e => { console.log(e) }}
                                        >

                                            <FormControlLabel value={0} sx={{ width: "50%" }} control={<FormLabel />} label="Serology Results: " />
                                            <FormControlLabel value={"reactive"} control={<Radio />} label="Reactive" />
                                            <FormControlLabel value={"non-reactive"} control={<Radio />} label="Non-Reactive" />
                                            <FormControlLabel value={"not-tested"} control={<Radio />} label="Not Tested" />
                                        </RadioGroup>

                                    </Grid>
                                </Grid>
                                <Divider />
                                <p></p>
                                <Grid container spacing={1} padding=".5em" >

                                    <Grid item xs={12} md={12} lg={4}>
                                        {!isMobile ? <DesktopDatePicker
                                            label="Date test done"
                                            inputFormat="MM/dd/yyyy"
                                            // value={referral.dob}
                                            onChange={e => { console.log(e);setMaternalSerology({...maternalSerology, dateTestDone: e}) }}
                                            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                        /> :
                                            <MobileDatePicker
                                                label="Date test done"
                                                inputFormat="MM/dd/yyyy"
                                                // value={referral.dob}
                                                onChange={e => { console.log(e);setMaternalSerology({...maternalSerology, dateTestDone: e}) }}
                                                renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                            />}
                                    </Grid>

                                    <Grid item xs={12} md={12} lg={4}>
                                        {!isMobile ? <DesktopDatePicker
                                            label="Date of next appointment"
                                            inputFormat="MM/dd/yyyy"
                                            // value={referral.dob}
                                            // onChange={e => { setReferral({ ...referral, dob: e }) }}
                                            onChange={e => { console.log(e);setMaternalSerology({...maternalSerology, dateOfNextAppointment: e}) }}

                                            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                        /> :
                                            <MobileDatePicker
                                                label="Date of next appointment"
                                                inputFormat="MM/dd/yyyy"
                                                // value={referral.dob}
                                                // onChange={e => { setReferral({ ...referral, dob: e }) }}
                                                onChange={e => { console.log(e);setMaternalSerology({...maternalSerology, dateOfNextAppointment: e}) }}

                                                renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                            />}
                                    </Grid>


                                </Grid>
                                <p></p>
                                <Divider />
                                <p></p>
                                <Stack direction="row" spacing={2} alignContent="right" >
                                    {(!isMobile) && <Typography sx={{ minWidth: '80%' }}></Typography>}
                                    <Button variant='contained' disableElevation sx={{ backgroundColor: 'gray' }}>Cancel</Button>
                                    <Button variant="contained" onClick={e => { saveSuccessfully() }} disableElevation sx={{ backgroundColor: "#632165" }}>Save</Button>
                                </Stack>
                                <p></p>
                            </TabPanel>



                        </TabContext>
                    </Container>
                </Layout>
            </LocalizationProvider>
        </>
    )

}




