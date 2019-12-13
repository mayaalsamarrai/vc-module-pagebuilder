import { createReducer, on } from '@ngrx/store';

import { PresetsModel } from '@themes/models';
import { BlockSchema, ValueType } from '@shared/models';

import * as Actions from './theme.actions';

export interface ThemeState {
    schemaLoading: boolean;
    schemaNotLoaded: boolean;
    presetsLoading: boolean;
    presetsNotLoaded: boolean;
    draftUploaded: boolean;
    uploadDraftFail: boolean;

    showPresetsEditor: boolean;
    selectedSchemaItem: BlockSchema; // this section corresponds to section from schema
    editableTheme: { [key: string]: ValueType }; // the current theme
    presets: PresetsModel; // the whole presets file which used as transport for preview
    initialPresets: string; // initial file with presets and theme as string
    schema: BlockSchema[]; // the settings schema
    dirty: boolean;
}

export const initialState: ThemeState = {
    schemaLoading: false,
    schemaNotLoaded: false,
    presetsLoading: false,
    presetsNotLoaded: false,
    draftUploaded: false,
    uploadDraftFail: false,

    showPresetsEditor: false,
    selectedSchemaItem: null,
    editableTheme: null,
    presets: null,
    initialPresets: null,
    schema: null,
    dirty: false
};

const themesReducer = createReducer(
    initialState,
    on(Actions.loadSchema, state => ({ ...state, schemaLoading: true })),
    on(Actions.loadSchemaSuccess, (state, { schema }) => ({ ...state, schema, schemaLoading: false, schemaNotLoaded: false })),
    on(Actions.loadSchemaFail, (state) => ({ ...state, schemaLoading: false, schemaNotLoaded: true })),
    on(Actions.saveTheme, state => ({ ...state, presets: { ...state.presets, current: { ...state.editableTheme } } })),
    on(Actions.saveThemeSuccess, state => ({ ...state, initialPresets: JSON.stringify(state.presets), dirty: false })),
    on(Actions.loadThemes, state => ({ ...state, presetsLoading: true })),
    on(Actions.loadThemesSuccess, (state, { presets }) => {
        const newPresets = { ...presets };
        if (typeof presets.current === 'string') {
            newPresets.current = { ...presets.presets[presets.current] };
        }
        return {
            ...state,
            editableTheme: { ...<any>newPresets.current },
            initialPresets: JSON.stringify(presets),
            presets: newPresets,
            presetsLoading: false,
            presetsNotLoaded: false
        };
    }),
    on(Actions.loadThemesFail, state => ({ ...state, presetsLoading: false, presetsNotLoaded: true })),
    on(Actions.selectSchemaItem, (state, { item }) => ({...state, selectedSchemaItem: item })),
    on(Actions.showPresetsPane, state => ({...state, showPresetsPane: true})),
    on(Actions.closeEditors, state => )
);

export function reducer(state = initialState, action: ThemeActions): ThemeState {
    switch (action.type) {
        case ThemeActionTypes.CloseEditors:
        case ThemeActionTypes.CancelPreset: {
            const newPresets = { ...state.presets };
            newPresets.current = { ...state.editableTheme };
            return {
                ...state,
                presets: newPresets,
                showPresetsEditor: false,
                selectedSchemaItem: null
            };
        }
        case ThemeActionTypes.ApplyPreset: {
            const newTheme = { ...state.presets.presets[action.payload] };
            const newPresets = { ...state.presets };
            newPresets.current = newTheme;
            return {
                ...state,
                editableTheme: newTheme,
                presets: newPresets,
                showPresetsEditor: false,
                dirty: true
            };
        }
        case ThemeActionTypes.UpdateTheme: {
            const currentTheme = { ...state.editableTheme, ...action.payload };
            const newPresets = { ...state.presets };
            newPresets.current = { ...currentTheme };
            return {
                ...state,
                editableTheme: currentTheme,
                presets: newPresets,
                dirty: true
            };
        }
        case ThemeActionTypes.ClearThemeChanges: {
            const newPresets = JSON.parse(state.initialPresets);
            if (typeof newPresets.current === 'string') {
                newPresets.current = { ...newPresets.presets[newPresets.current] };
            }
            return {
                ...state,
                presets: newPresets,
                editableTheme: { ...newPresets.current },
                dirty: false,
                draftUploaded: false
            };
        }
        case ThemeActionTypes.RemovePreset: {
            const newPresets = { ...state.presets };
            delete newPresets.presets[action.payload];
            return {
                ...state,
                presets: newPresets,
                dirty: true
            };
        }
        case ThemeActionTypes.CreatePreset: {
            const newPresets = { ...state.presets };
            newPresets.presets[action.payload] = { ...state.editableTheme };
            newPresets.current = { ...state.editableTheme };
            return {
                ...state,
                presets: newPresets,
                dirty: true
            };
        }
        case ThemeActionTypes.SelectPreset: {
            const newPresets = { ...state.presets };
            newPresets.current = { ...newPresets.presets[action.payload] };
            return {
                ...state,
                presets: newPresets
            };
        }
        case ThemeActionTypes.UpdateDraftSuccess: {
            return {
                ...state,
                draftUploaded: true
            };
        }
    }
    return state;
}
