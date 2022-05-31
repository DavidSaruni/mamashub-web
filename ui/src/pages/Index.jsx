import { Typography, Stack, TextField, Button, Container, useMediaQuery } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as qs from 'query-string';
import Layout from '../components/Layout';
import { DataGrid } from '@mui/x-data-grid';
import { getCookie } from '../lib/cookie';

import { FhirApi } from './../lib/api'

export default function Index() {
    let [patients, setPatients] = useState()
    let navigate = useNavigate()
    let [selected, setSelected] = useState([])

    let selectPatient = (id) => {
        window.localStorage.setItem("currentPatient", id)
    }

    let getPatients = async () => {

        let data = await FhirApi({ url: '/fhir/Patient', method: 'GET'})
        let p = data.data.entry.map((i) => {
            let r = i.resource
            return { id: r.id, lastName: r.name[0].family, firstName: r.name[0].given[0],
                age: `${(Math.floor((new Date() - new Date(r.birthDate).getTime()) / 3.15576e+10))} years`
            }
        })
        setPatients(p)
    }

    let deletePatient = async () => {

    }
 
    useEffect(() => {
        getPatients()
    }, [])

    useEffect(() => {
        if (getCookie("token")) {
            return
        } else {
            navigate('/login')
            window.localStorage.setItem("next_page", "/")
            return
        }
    }, [])



    const columns = [
        { field: 'id', headerName: 'Patient ID', width: 100 },
        { field: 'lastName', headerName: 'Last Name', width: 250, },
        { field: 'firstName', headerName: 'First Name', width: 250, },
        { field: 'age', headerName: 'Age', width: 250 }
        // { field: 'role', headerName: 'Date of admission', width: 150 }
    ];

    let isMobile = useMediaQuery('(max-width:600px)');

    let args = qs.parse(window.location.search);
    // console.log(args)

    return (
        <>
            <Layout>
                <br />
                <Stack direction="row" gap={1} sx={{ paddingLeft: isMobile ? "1em" : "2em", paddingRight: isMobile ? "1em" : "2em" }}>
                    <TextField type={"text"} size="small" sx={{ width: "80%" }} placeholder='Patient Name or Patient ID' />
                    <Button variant="contained" size='small' sx={{ width: "20%" }} disableElevation>Search</Button>
                </Stack>
                <br />
                <Container maxWidth="lg">
                <Stack direction="row" spacing={2} alignContent="right" >
                {(!isMobile) && <Typography sx={{ minWidth: (selected.length > 0) ? '68%' : '78%' }}></Typography>}
                    {(selected.length === 1) &&
                        <>
                            <Button variant="contained" onClick={e=>{"deleteUsers()"}} disableElevation sx={{ backgroundColor: 'green' }}>View Patient</Button></>
                    }
                    {(selected.length === 1) && 
                        <Button variant="contained" disableElevation sx={{ backgroundColor: 'gray' }}>Start Visit</Button>
                    }
                </Stack>
                <br/>
                <DataGrid
                    loading={patients ? false : true}
                    rows={patients?patients : []}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    autoHeight
                    disableSelectionOnClick
                    onSelectionModelChange={e => { setSelected(e) }}
                    onCellEditStop={e => { console.log(e) }}
                />
                </Container>
            </Layout>
        </>
    )

}




