import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import React from 'reactn';
import { CustomTheme } from '../../../theme/index';
import { MemoizedSegmentBlockHeadV2 } from './SegmentBlockHeadV2';
import { WordAlignmentBlock } from './WordAlignmentBlock';
import { Segment } from "../../../types";

const useStyles = makeStyles((theme: CustomTheme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
            minWidth: 0,
            width: '1076px'
        },
        block: {
            marginLeft: theme.spacing(1),
            display: 'flex',
            minWidth: 0,
            // maxWidth: '1076px',
            flexDirection: 'row',
            alignContent: 'flex-wrap',
            flexWrap: 'wrap',
        },
    }),
);

interface SegmentBlockProps  {
    segment: Segment;
    assignSpeakerForSegment: (segmentIndex: string) => void;
    readOnly?: boolean;
    removeHighRiskValueFromSegment: (segmentId: string) => void;
}

export const SegmentBlockV2 = (props: SegmentBlockProps) => {
    const classes = useStyles();
    const { segment, assignSpeakerForSegment, readOnly, removeHighRiskValueFromSegment } = props;
    const sumReducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    const wordLengthArray = segment.wordAlignments.map(word => word.word.length);
    const totalLength = wordLengthArray.reduce(sumReducer, 0);
    const wordPerLine = 60;

    return (
        <div className={classes.root}>
            <MemoizedSegmentBlockHeadV2
                readOnly={readOnly}
                assignSpeakerForSegment={assignSpeakerForSegment}
                removeHighRiskValueFromSegment={removeHighRiskValueFromSegment}
                segment={segment}
            />
                {/*<EditorBlock {...props} />*/}
            {totalLength <= wordPerLine
                ? <div className={classes.block}
                       style={{ width: `${ totalLength / wordPerLine * 100}%` }}>
                    {segment.wordAlignments.map((word: WordAlignment, index: number) => {
                        return (
                            <WordAlignmentBlock
                                key={`word-alignment-${index}`}
                                start={word.start}
                                length={word.length}
                                word={word.word}
                                confidence={word.confidence}
                                totalLength={totalLength} />
                        )
                    })}
                </div>
                : <div className={classes.block}
                       style={{ width: `${ totalLength > wordPerLine ? 100 : totalLength / wordPerLine * 100}%` }}>
                    {segment.wordAlignments.map((word: WordAlignment, index: number) => {
                        return (
                            <WordAlignmentBlock
                                key={`word-alignment-${index}`}
                                start={word.start}
                                length={word.length}
                                word={word.word}
                                confidence={word.confidence}
                                totalLength={totalLength} />
                        )
                    })}
                </div>
            }
        </div>
    );
};
