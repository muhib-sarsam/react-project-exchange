import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Helper from '../lib/Helper';
import Services from '../lib/Services';
import Store from "../lib/Store";

import $ from 'jquery';
import Datatable from 'datatables.net';


class GetRates extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        hasError: false,
        refresh: false,
        rMainArray: [],
        rDate: 0,
        CAD: 0
    };
  }

  getLatestRate = (isRefresh) => {
    let url_getLatestRate = 'https://api.exchangeratesapi.io/latest?symbols=CAD&base=USD';

    (Services.serviceFetch(url_getLatestRate)).then(response => {
      this.setState({ rDate: response.date, CAD: response.rates.CAD }, () => console.log('__set latestRate__'));
    });
  }

  getAllRates = (isRefresh) => {
    console.log('>>'+isRefresh);
    let url_getAllRates = 'https://api.exchangeratesapi.io/history?start_at=' + Helper.getDateRange().start + '&end_at=' + Helper.getDateRange().end + '&symbols=GBP,EUR,AUD,CAD&base=USD';
    //reset array
    Store.length = 0;
    this.setState({ rMainArray: Store }, () => console.log('__reset rMainArray__'));

    (Services.serviceFetch(url_getAllRates)).then(response => {
      const newItems = Object.entries(response['rates']).map(([k, v]) => {
        let obj = {};
        obj.identifier = k;
        obj.collection = v;
        Store.push(obj);
      })

      this.setState({ rMainArray: Store }, () => console.log('__set rMainArray__'));

      //if first visit, instantiate
      if (!isRefresh) {
        $('#tbl-rates').DataTable({
          'processing': false,
          'bDestroy': true,
          'data': Store,
          'stateSave': false,
          'columns': [{
            'data': 'identifier'
          },
          {
            'data': 'collection.CAD'
          },
          {
            'data': 'collection.EUR'
          },
          {
            'data': 'collection.AUD'
          },
          {
            'data': 'collection.GBP'
          }
          ]
        });
      }
      else {
        $('#tbl-rates').DataTable().clear().rows.add(Store).draw();
      }
    });
  }

  // events
  handleRefresh = () => {
    this.setState(//with callback
      { refresh: true },
      () => console.log(this.state.refresh)
    );

    this.getLatestRate(this.state.refresh);
    this.getAllRates(this.state.refresh);
  }

  componentDidMount = () => {
    this.getLatestRate(this.state.refresh);
    this.getAllRates(this.state.refresh);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="col-12">
        <div className="flex"><div className="lbl-key">Last updated:</div>
          <div id="lbl-date" className="lbl-val">{this.state.rDate}</div>  <div className="lbl-key">US/CAD:</div><div id="lbl-CAD" className="lbl-val">{this.state.CAD}</div>
        </div>

        <table id="tbl-rates" ref={el => this.el = el} >
          <thead>
            <tr>
              <th>Date</th>
              <th>USD/CAD</th>
              <th>USD/EUR</th>
              <th>USDAUD</th>
              <th>USD/GBP</th>
            </tr>
          </thead>
        </table>
        <input id="hdn" type="hidden" value='' readOnly />
        <button id="btn-reload" onClick={() => this.handleRefresh()}>Refresh</button>
      </div>
    );
  }
}

export default GetRates;
