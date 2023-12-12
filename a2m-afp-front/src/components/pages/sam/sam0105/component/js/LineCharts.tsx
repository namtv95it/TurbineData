import React, { useEffect, useRef, useState } from 'react'
import FooterHashTag from '../../../common/FooterHashTag'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataCharts } from './data';

import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

export default function LineCharts() {
    const basic = DataCharts.LINE_CONFIG_1
    const spline = DataCharts.LINE_CONFIG_2
    const lineWithLabel = DataCharts.LINE_CONFIG_3
    const area = DataCharts.AREA_CONFIG
    const areaRange = DataCharts.AREA_RANGE_CONFIG

    const [realTime, setRealTime] = useState(DataCharts.LINE_CHARTS_REALTIME)

    const interval = useRef<any>()

    useEffect(() => {
        interval.current = setInterval(() => {
            const current = [Math.floor(new Date().getTime() / 1000) * 1000, Math.random()]
            
            const data: any[] = realTime.series[0].data;
            data.push(current);
            setRealTime((realTime: any) => {
                return {
                    ...realTime,
                    series: [
                        {
                            ...realTime.series[0],
                            data: data
                        }
                    ]
                }
            })
        }, 1000)

        return () => {
            clearInterval(interval.current)
        }
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Line</h4>
                        </div>
                        <div className="card-body">
                            <div className="flex justify-content-center">
                                <HighchartsReact highcharts={Highcharts} options={basic} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Spline</h4>
                        </div>
                        <div className="card-body">
                            <div className="flex justify-content-center">
                                <HighchartsReact highcharts={Highcharts} options={spline} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Line with label</h4>
                        </div>
                        <div className="card-body">
                            <div className="flex justify-content-center">
                                <HighchartsReact highcharts={Highcharts} options={lineWithLabel} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Area</h4>
                        </div>
                        <div className="card-body">
                            <div className="flex justify-content-center">
                                <HighchartsReact highcharts={Highcharts} options={area} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Area range</h4>
                        </div>
                        <div className="card-body">
                            <div className="flex justify-content-center">
                                <HighchartsReact highcharts={Highcharts} options={areaRange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Time series zoomable</h4>
                        </div>
                        <div className="card-body">
                            <div className="flex justify-content-center">
                                <HighchartsReact highcharts={Highcharts} options={realTime} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterHashTag />
        </>
    )
}
