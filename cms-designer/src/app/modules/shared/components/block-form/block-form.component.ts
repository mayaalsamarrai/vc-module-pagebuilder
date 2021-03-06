import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BlockSchema, BlockValuesModel, BlocksSchema } from '@shared/models';
import { FormHelper } from '@shared/services';
import { ReturnStatement } from '@angular/compiler';

@Component({
    selector: 'app-block-form',
    templateUrl: './block-form.component.html'
})
export class BlockFormComponent implements OnInit, OnDestroy {
    private _model: BlockValuesModel;
    private _schema: BlocksSchema | BlockSchema;

    @Input() context: any;

    @Input() get model(): BlockValuesModel { // модель используется при создании формы, для получения значений
        return this._model;
    }
    set model(value: BlockValuesModel) {
        if (this._model !== value) {
            this._model = value;
            console.log('model');
            this.createForm();
        }
    }

    get settings() {
        if (this.model && this.schema) {
            return this.model.type ? this.schema[this.model.type].settings : this.schema.settings;
        }
        return null;
    }

    @Input() get schema(): BlocksSchema | BlockSchema { // схема редактируемого блока
        return this._schema;
    }
    set schema(value: BlocksSchema | BlockSchema) {
        if (this._schema !== value) {
            this._schema = value;
            console.log('schema');
            this.createForm();
        }
    }

    @Output() modelChange = new EventEmitter<BlockValuesModel>();

    form: FormGroup;

    private subscription: Subscription = null;

    constructor(private formHelper: FormHelper, private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.createForm();
    }

    ngOnDestroy() {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    private createForm() {
        const m = this.model;
        if (m && this.schema) {
            const s = m.type ? this.schema[m.type] : this.schema;
            if (s && (!m.type || m.type === s.type)) {
                if (this.subscription != null) {
                    this.subscription.unsubscribe();
                    this.subscription = null;
                }
                this.form = this.formHelper.generateForm(m, s.settings);
                this.subscription = this.form.valueChanges.subscribe(value => {
                    this.modelChange.emit(value);
                });
                this.changeDetector.detectChanges();
            }
        }
    }
}
