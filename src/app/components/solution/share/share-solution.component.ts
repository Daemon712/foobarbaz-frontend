import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {Revision} from "../../../model/revision";
import {SolutionStatus} from "../../../model/solutions-status";
import {AceEditorComponent} from "ng2-ace-editor";

@Component({
  selector: 'app-share-solution',
  templateUrl: './share-solution.component.html',
  styleUrls: ['./share-solution.component.scss']
})
export class ShareSolutionComponent implements OnInit {

  @Input()
  revision: Revision;

  @Output()
  onSubmit = new EventEmitter<string>();

  @ViewChild('shareModal')
  shareModal: ModalDirective;

  @ViewChild('solutionView')
  solutionView: AceEditorComponent;


  comment: string;
  status = SolutionStatus;
  options = {
    printMargin: false,
    fontSize: '14px',
    showGutter: false,
    highlightActiveLine: false,
  };

  constructor() { }

  ngOnInit() {
  }

  open(){
    this.solutionView.setText(this.revision.solution);
    this.shareModal.show();
    this.solutionView.getEditor().clearSelection();
  }

  close(){
    this.solutionView.setText('');
    this.shareModal.hide();
  }

  submit(){
    this.onSubmit.emit(this.comment);
    this.close();
  }
}
