import React from 'react';
import ReactDOM from 'react-dom';
import LightcurveView from './LightcurveView';
import TransitView from './TransitView';
import RangeStepInput from './RangeStepInput';
import {forceNumber} from './utils';

class ExoplanetTransitSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preset: 0,

            // Lightcurve view settings
            showTheoreticalCurve: true,
            showSimulatedMeasurements: false,
            noise: 0.1,
            number: 50,

            // Planet properties
            planetMass: 0.657,
            planetRadius: 1.32,
            planetSemimajorAxis: 0.047,
            planetEccentricity: 0,

            // Star properties
            starMass: 1.09,

            // System orientation and phase
            inclination: 86.929,
            longitude: 0,
            phase: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    render() {
        return <React.Fragment>
            <nav className="navbar navbar-expand-md navbar-light bg-light d-flex justify-content-between">
                <span className="navbar-brand mb-0 h1">Exoplanet Transit Simulator</span>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Reset</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" data-toggle="modal" data-target="#helpModal">Help</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" data-toggle="modal" data-target="#aboutModal">About</a>
                    </li>
                </ul>
            </nav>


            <div className="row mt-2">

                <div className="col-4">
                    <TransitView phase={this.state.phase} />
                    <h5>Presets</h5>
                    <select className="form-control form-control-sm">
                        <option value={0}>1. Option A</option>
                        <option value={1}>2. Option B</option>
                        <option value={2}>3. OGLE-TR-113 b</option>
                        <option value={3}>4. TrES-1</option>
                        <option value={4}>5. XO-1 b</option>
                        <option value={5}>6. HD 209458 b</option>
                        <option value={6}>7. OGLE-TR-111 b</option>
                        <option value={7}>8. OGLE-TR-10 b</option>
                        <option value={8}>9. HD 189733 b</option>
                        <option value={9}>10. HD 149026 b</option>
                        <option value={10}>11. OGLE-TR-132 b</option>
                    </select>
                </div>

                <div className="col-6">
                    <LightcurveView phase={this.state.phase} />
                    <div className="row">
                        <div className="col">
                            <div className="form-inline">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                           name="showTheoreticalCurve"
                                           id="showTheoreticalCurveToggle" />
                                    <label className="custom-control-label" htmlFor="showTheoreticalCurveToggle">
                                        Show theoretical curve
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                           name="showSimulatedMeasurements"
                                           id="showSimulatedMeasurementsToggle" />
                                    <label className="custom-control-label" htmlFor="showSimulatedMeasurementsToggle">
                                        Show simulated measurements
                                    </label>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">
                                        Noise:
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number" name="planetAxis"
                                            className="form-control form-control-sm"
                                            disabled={!this.state.showSimulatedMeasurements}
                                            name="noise"
                                            value={this.state.noise}
                                            onChange={this.handleInputChange}
                                            step={0.01} />
                                        <RangeStepInput
                                            className="form-control"
                                            disabled={!this.state.showSimulatedMeasurements}
                                            name="noise"
                                            value={this.state.noise}
                                            onChange={this.handleInputChange}
                                            min={0.01} max={10} step={0.01} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">
                                        Number:
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="number" name="planetAxis"
                                            className="form-control form-control-sm"
                                            disabled={!this.state.showSimulatedMeasurements}
                                            name="number"
                                            value={this.state.number}
                                            onChange={this.handleInputChange}
                                            step={0.01} />
                                        <RangeStepInput
                                            className="form-control"
                                            disabled={!this.state.showSimulatedMeasurements}
                                            name="number"
                                            value={this.state.number}
                                            onChange={this.handleInputChange}
                                            min={0.01} max={10} step={0.01} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            Eclipse depth: 0.0159
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-4">
                    <h5>Planet Properties</h5>
                    <div className="form-inline">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">
                                Mass:
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="number" name="planetMass"
                                    className="form-control form-control-sm"
                                    name="planetMass"
                                    value={this.state.planetMass}
                                    onChange={this.handleInputChange}
                                    min={0.01} max={2}
                                    step={0.0001} />
                                M<sub>jup</sub>

                                <RangeStepInput
                                    className="form-control"
                                    name="planetMass"
                                    value={this.state.planetMass}
                                    onChange={this.handleInputChange}
                                    min={0.01} max={2} step={0.0001} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">
                                Radius:
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="number" name="planetRadius"
                                    className="form-control form-control-sm"
                                    name="planetRadius"
                                    value={this.state.planetRadius}
                                    onChange={this.handleInputChange}
                                    min={0.01} max={2}
                                    step={0.0001} />
                                R<sub>jup</sub>

                                <RangeStepInput
                                    className="form-control"
                                    name="planetRadius"
                                    value={this.state.planetRadius}
                                    onChange={this.handleInputChange}
                                    min={0.01} max={2} step={0.0001} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">
                                Semimajor axis:
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="number" name="planetAxis"
                                    className="form-control form-control-sm"
                                    name="planetSemimajorAxis"
                                    value={this.state.planetSemimajorAxis}
                                    onChange={this.handleInputChange}
                                    min={0.01} max={2}
                                    step={0.0001} />
                                AU

                                <RangeStepInput
                                    className="form-control"
                                    name="planetSemimajorAxis"
                                    value={this.state.planetSemimajorAxis}
                                    onChange={this.handleInputChange}
                                    min={0.01} max={2}
                                    step={0.0001} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">
                                Eccentricity:
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="number" name="planetEccentricity"
                                    className="form-control form-control-sm"
                                    name="planetEccentricity"
                                    value={this.state.planetEccentricity}
                                    onChange={this.handleInputChange}
                                    min={0} max={0.4}
                                    step={0.01} />

                                <RangeStepInput
                                    className="form-control"
                                    name="planetEccentricity"
                                    value={this.state.planetEccentricity}
                                    onChange={this.handleInputChange}
                                    min={0} max={0.4}
                                    step={0.01} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <h5>Star Properties</h5>
                    <div className="form-inline">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">
                                Mass:
                            </label>

                            <div className="col-sm-10">
                                <input type="number"
                                       name="starMass"
                                       className="form-control form-control-sm"
                                       name="starMass"
                                       value={this.state.starMass}
                                       onChange={this.handleInputChange}
                                       step={0.01} />
                                M<sub>sun</sub>

                                <RangeStepInput
                                    className="form-control"
                                    name="starMass"
                                    value={this.state.starMass}
                                    onChange={this.handleInputChange}
                                    min={0.01} max={10} step={0.01} />
                            </div>
                        </div>
                    </div>
                    <p>
                        A main sequence star of this mass would have
                        spectral type F8V, temperature 6100 K, and
                        radius 1.1 Rsun
                    </p>
                </div>

                <div className="col-4">
                    <h5>System Orientation and Phase</h5>

                    <div className="form-inline">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">
                                Inclination:
                            </label>

                            <div className="col-sm-10">
                                <input
                                    type="number" name="planetAxis"
                                    className="form-control form-control-sm"
                                    name="inclination"
                                    value={this.state.inclination}
                                    onChange={this.handleInputChange}
                                    step={0.01} />&deg;

        <RangeStepInput
            className="form-control"
            name="inclination"
            value={this.state.inclination}
            onChange={this.handleInputChange}
            min={0.01} max={10} step={0.01} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label col-form-label-sm">
                                Longitude:
                            </label>

                            <div className="col-sm-10">
                                <input
                                    type="number" name="planetAxis"
                                    className="form-control form-control-sm"
                                    name="longitude"
                                    value={this.state.longitude}
                                    onChange={this.handleInputChange}
                                    step={0.01} />&deg;

        <RangeStepInput
            className="form-control"
            name="longitude"
            value={this.state.longitude}
            onChange={this.handleInputChange}
            min={0.01} max={10} step={0.01} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="phaseSlider"
                                   className="col-sm-2 col-form-label col-form-label-sm">
                                Phase:
                            </label>

                            <div className="col-sm-10">
                                <RangeStepInput
                                    className="form-control"
                                    name="phase" id="phaseSlider"
                                    value={this.state.phase}
                                    onChange={this.handleInputChange}
                                    min={0.01} max={10} step={0.01} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>;
    }
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        let value = target.type === 'checkbox' ?
                    target.checked : target.value;

        if (target.type === 'radio') {
            value = target.id === (target.name + 'Radio');
        } else if (target.type === 'range' || target.type === 'number') {
            value = forceNumber(value);
        }

        this.setState({
            [name]: value
        });
    }
}

const domContainer = document.querySelector('#sim-container');
ReactDOM.render(<ExoplanetTransitSimulator />, domContainer);
