import React, { Component } from 'react';
import ReactDom from 'react-dom';
import homeStyle from './style.less';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';

class Plus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mod: 'init'//'active'
        }
        this.addModule = this.addModule.bind(this);
    }
    addModule(type) {
        this.setState({
            mod: 'init'
        });
        if (type !== 'back') this.props.addHandler(type);
    }
    render() {
        return <QueueAnim className='plusWrapper'>
            {this.state.mod === 'init' ? <div key='init' onClick={() => {
                this.setState({ mod: 'active' });
            }}>
                <svg t="1525435538230"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                ><defs><style type="text/css"></style></defs>
                    <path d="M675.04 483.264l-127.04 0 0-127.264c0-20.064-16.288-36.32-36.32-36.32-20.064 0-36.32 16.192-36.32 36.32l0 127.232-127.072 0c-20.064 0-36.352 16.32-36.352 36.352 0 20.064 16.224 36.352 36.352 36.352l127.072 0 0 127.232c0 20 16.256 36.384 36.32 36.384 20.032 0 36.32-16.256 36.32-36.384l0-127.136 127.04 0c19.968 0 36.352-16.256 36.352-36.384C711.36 499.552 695.136 483.264 675.04 483.264L675.04 483.264zM511.328 65.44c-250.24 0-453.952 203.616-453.952 453.952 0 250.336 203.712 453.952 453.952 453.952 250.336 0 453.984-203.584 453.984-453.952C965.312 269.056 761.696 65.44 511.328 65.44L511.328 65.44zM511.328 916.576c-219.04 0-397.184-178.176-397.184-397.152 0-219.104 178.144-397.216 397.184-397.216s397.216 178.112 397.216 397.216C908.576 738.368 730.368 916.576 511.328 916.576L511.328 916.576zM511.328 916.576"></path>
                </svg>
                <span>点击此处添加内容</span>
            </div> : <div key='act' className='activePanel'>
                    <div onClick={() => { this.addModule('text') }}>
                        <svg t="1525435538230"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        ><defs></defs>
                            <path d="M874.25024 316.22144l-8.8064-206.72H158.55616l-8.8064 206.72h30.18752c25.15456-133.76 59.11552-155.648 192.44544-155.648h75.4688V764.928c0 107.00288-13.83936 120.39168-118.23616 126.45888v23.11168h367.2832V891.392c-103.14752-4.85888-120.75008-19.456-120.75008-111.87712V160.56832h74.20928c133.31968 0 166.03136 21.888 193.69984 155.648h30.19264z"></path>
                        </svg>
                    </div>
                    <div onClick={() => { this.addModule('img') }}>
                        <svg t="1525435538230"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        ><defs></defs>
                            <path d="M885.312 95.712H134.08c-23.04 0-41.728 18.688-41.728 41.76v745.248c0 23.04 18.688 41.696 41.728 41.696h751.232c23.04 0 41.728-18.656 41.728-41.696V137.472c0-23.072-18.688-41.728-41.728-41.728z m-83.456 703.52H217.568v-208.64l125.216-125.216 208.672 208.672 125.216-125.216 125.184 125.216v125.184zM718.4 465.376a83.456 83.456 0 1 1 0-166.912 83.456 83.456 0 0 1 0 166.912z"></path>
                        </svg>
                    </div>
                    <div onClick={() => { this.addModule('ad') }}>
                        <svg t="1525435538230"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        ><defs></defs>
                            <path d="M343.227862 303.331147l-50.600412 140.903003h102.47761l-50.18062-140.903003h-1.696578z m324.862432-10.474347h-55.705505v230.328123h54.859776c38.544163 0 66.755275-9.446366 84.615931-28.360599 17.570896-18.893756 26.364023-47.830803 26.364023-86.804998 0-39.545523-8.652855-68.622842-25.943207-87.251412-17.855536-18.603996-45.921257-27.911114-84.191018-27.911114zM875.405571 96.990609H149.129921c-28.651383 0-51.877198 23.230934-51.877197 51.877198v518.767882c0 28.651383 23.224791 51.877198 51.877197 51.877198h726.27565c28.646264 0 51.877198-23.224791 51.877197-51.877198V148.867807c0-28.646264-23.230934-51.877198-51.877197-51.877198z m-437.782649 466.761675l-28.490633-80.263395H278.594077l-28.490633 80.263395h-49.324651l116.930776-311.457725h52.733165L487.372486 563.752284h-49.749564z m349.529877-41.879982c-25.513175 27.920329-62.656662 41.879981-111.41101 41.879982H566.03862V252.294559h110.560161c48.753324 0 85.887597 14.105044 111.40589 42.311037 23.811477 26.161294 35.717216 63.979522 35.717216 113.412706-0.001024 48.577215-12.192426 86.525477-36.569088 113.854zM97.253748 927.009391h830.02902V823.266258H97.253748v103.743133z"></path>
                        </svg>
                    </div>
                    <div onClick={() => { this.addModule('back') }}>
                        <svg t="1525435538230"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        ><defs></defs>
                            <path d="M628.195 289.583H451.778V146.276L64.697 339.813l387.08 193.543V390.377h191.026c151.212 0 226.795 63.332 226.795 189.997 0 131.049-78.1 196.557-234.34 196.557h-445.52v100.794h450.051c213.01 0 319.514-95.923 319.514-287.773 0-200.239-110.36-300.37-331.108-300.37z m0 0"></path>
                        </svg>
                    </div>
                </div>}
        </QueueAnim>
    }
}

export default Plus;