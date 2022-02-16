import React, { RefObject } from 'react';
import { connect } from 'react-redux';

import CanvasContainer from '../Canvas/CanvasContainer';
import { RootState } from '../Store/rootReducer';
import measureTime from '../Utils/measureTime';

type DrawKochSnowflakeProps = {
    canvasProps: { width: string, height: string };
    stepCount: number;
    calculationType: 'recursive' | 'iterative';
    rule: string[];
    anglePlus?: number;
    angleMinus?: number;

    recursionCount: number;
    iterationCount: number;
    calculationTime: number;
    joinCount: number;
};

class DrawKochSnowflake extends React.Component<DrawKochSnowflakeProps> {

    // https://www.section.io/engineering-education/desktop-application-with-react/
    // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

    canvasContainerRef: RefObject<CanvasContainer>;
    updateCount = 0;

    constructor(props: DrawKochSnowflakeProps) {

        super(props);
        this.canvasContainerRef = React.createRef();
    }

    componentDidMount() {
        this.draw();
    }

    // FIXME maybe to often, trigger drawing on props change instead ?!
    componentDidUpdate() {
        this.draw();
    }

    draw() {

        const canvas = this.canvasContainerRef.current;

        canvas?.clearCanvas();

        if (this.props.stepCount > 8) {
            canvas?.drawText(30, 50, 'too many recursion steps (max. 8) !');
            return;
        }

        let x = 200;
        let y = 220;
        let length = 600 / 3 ** this.props.stepCount;
        let angle = 0;

        let recursionIterationCountText;
        if (this.props.calculationType === 'recursive') {
            recursionIterationCountText = `${this.props.recursionCount} recursions`;
        } else if (this.props.calculationType === 'iterative') {
            recursionIterationCountText = `${this.props.iterationCount} iterations`;
        }

        canvas?.drawTextLines(
            20,
            40,
            this.props.calculationType,
            `${this.props.rule.length} segments`,
            recursionIterationCountText || '',
            `${this.props.joinCount} joins`,
        );

        const anglePlus = this.props.anglePlus || 0;
        const angleMinus = this.props.angleMinus || 0;

        const drawTime = measureTime(() => {

            canvas?.drawLineInit(x, y);

            this.props.rule.forEach(element => {

                switch (element) {
                    case 'L':
                        angle += anglePlus;
                        break;
                    case 'R':
                        angle += angleMinus;
                        break;
                    default:
                        break;
                }

                x += Math.cos(angle) * length;
                y -= Math.sin(angle) * length;

                canvas?.drawLine(x, y);
            });

            canvas?.drawLineFinish();
        });

        canvas?.drawTextLines(
            20,
            720,
            `calculation time: ${this.props.calculationTime} ms`,
            `draw time: ${drawTime} ms`,
        );
    }

    render() {
        return (
            <div>
                <CanvasContainer
                    ref={this.canvasContainerRef}
                    canvasProps={this.props.canvasProps}
                />

                <div>update count: {++this.updateCount}</div>
            </div>
        )
    }
};

const mapStateToProps = (state: RootState) => ({
    anglePlus: state.settings.anglePlus,
    angleMinus: state.settings.angleMinus,
});

export default connect(mapStateToProps)(DrawKochSnowflake);
