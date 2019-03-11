import {
  FETCH_MEETINGS_REQUEST,
  FETCH_MEETINGS_RESPONSE,
  FETCH_MEETINGS_FAILED,
  FETCH_INBOX,
  FETCH_FILTERED_MEETINGS,
  FETCH_MEETING,
  MESSAGE_UPDATE,
  MESSAGE_UPDATE_SUCCESS,
  MESSAGE_UPDATE_FAIL, FETCH_MEETING_REQUEST
} from "../actions/types";

const INITIAL_STATE = {
  meetings: {
    hasLoadedMeetings: false,
    items: [],
    main: {},
    hasLoadedMainMeeting: false
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MESSAGE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload };
    case FETCH_MEETINGS_REQUEST:
      return {
        ...state,
        meetings: {items: [], hasLoadedMeetings: false},
      };
    case FETCH_MEETINGS_RESPONSE:
      return {
        ...state,
        meetings: {items: action.payload, hasLoadedMeetings: true},
      };
    case FETCH_MEETINGS_FAILED:
      return {
        ...state,
        meetings: {items: [], hasLoadedMeetings: false},
      };
    case FETCH_MEETING_REQUEST:
      return {
        ...state,
        meeting: action.payload,
        hasLoadedMeeting: true
      };
    // case FETCH_MAIN_VENUE:
    //   return {
    //     ...state,
    //     venues: action.payload,
    //     hasLoadedVenues: true
    //   };
    // case FETCH_MAIN_EXPECTATIONS:
    //   return {
    //     ...state,
    //     expectations: action.payload,
    //     hasLoadedExpectations: true,
    //   };
    // case FETCH_MAIN_FACILITATORS:
    //   return {
    //     ...state,
    //     facilitators: action.payload,
    //     hasLoadedFacilitators: true
    //   };
    // case FETCH_MAIN_PARTICIPANTS:
    //   return { ...state, participants: action.payload, hasLoadedParticipants: true };
    // case FETCH_MAIN_SPONSORS:
    //   return { ...state, sponsors: action.payload, hasLoadedSponsors: true };
    // case FETCH_MAIN_FLOORPLANS:
    //   return { ...state, floorPlans: action.payload, hasLoadedFloorPlans: true };
    // case FETCH_MAIN_DISCUSSIONS:
    //   return { ...state, discussions: action.payload, hasLoadedDiscussions: true };
    // case FETCH_MAIN_TALKS:
    //   return { ...state, talks: action.payload, hasLoadedTalks: true };
    case FETCH_INBOX:
      return { ...state, emails: action.payload };
    case FETCH_FILTERED_MEETINGS:
      return { ...state, meetings: action.payload };
    case MESSAGE_UPDATE_SUCCESS:
      return { ...state, message: action.payload };
    case MESSAGE_UPDATE_FAIL:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
