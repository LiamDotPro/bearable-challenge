import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createSelector} from '@reduxjs/toolkit'
import {Count, Entry} from "../interfaces/Category";
import {RootState} from "./store";
import {convertIntegerNumberToString} from "../shared/convertIntegerNumberToString";

// Define a type for the slice state
interface EntriesState {
    entries: Entry[]
}

// Define the initial state using that type
const initialState: EntriesState = {
    entries: []
}

export const entriesSlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {
        addNewEntry: (state, action: PayloadAction<{ entry: Entry }>) => {
            state.entries = [...state.entries, action.payload.entry];
        }
    }
})

export const {addNewEntry} = entriesSlice.actions

const selectEntries = (state: RootState) => state.entriesReducer.entries

// Create a selector that grabs the entries from the store
// and returns a list of the entries in order and with the most recent first
// I'll be happy with O(2) or O(1) complexity here
export const selectFormattedEntries = createSelector(
    [selectEntries],
    (entries) => {

        // Here we create a map instead of an array as
        // we will want to reference feelings by key instead of index
        let result = new Map<string, Count>();

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];

            for (let x = 0; x < entry.feelings.length; x++) {
                if (!result.has(entry.feelings[x])) {
                    result.set(entry.feelings[x], {
                        one: 0,
                        two: 0,
                        three: 0,
                        four: 0,
                        five: 0
                    })
                }

                const selectedFeelings: Count = result.get(entry.feelings[x]);

                // Here is a nice quirk of the assessment logic as 1|2|3|4|5 can always be used
                // as a string key reference to the feelings map
                selectedFeelings[convertIntegerNumberToString(entry.moodAssessment)]++;
                result.set(entry.feelings[x], selectedFeelings);
            }
        }

        // Finally we order our data by the most entries
        // one problem here is the criteria doesn't suggest what to do when
        // a feeling has equal entries and the design doesn't suggest an answer
        // so I took the liberty to just use arbitrary sorting
        // I'd suggest using something like unhappy -> happy with more weighting for entries that have
        // strong mood assessments (1|2|3|4|5)

        return Array.from([...result].sort((a, b) => {

            // reduce object keys values to a single number
            const aCount: number = Object.values(a[1]).reduce((acc, curr) => acc + curr, 0);
            const bCount: number = Object.values(b[1]).reduce((acc, curr) => acc + curr, 0);

            if (aCount > bCount) {
                return -1;
            } else if (aCount < bCount) {
                return 1;
            } else {
                return 0;
            }
        }));
    })

export default entriesSlice.reducer