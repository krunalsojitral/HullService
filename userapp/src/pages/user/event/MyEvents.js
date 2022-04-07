import React, { useState, useRef, ref } from 'react';
import Header from './../../../sections/Header';
import Footer from './../../../sections/Footer';
import Sidebar from './../Sidebar';

export default function MyEvents() {
    

    return(
        <div>
            <Header/>
            <section className="inner-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>My Events</h2>
                        </div>
                    </div>
                </div>
            </section>    

            <section className="dashboard-card">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 side-col">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </section>                            
                  

            <Footer/>
        </div>
    )
}