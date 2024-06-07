package com.Ascendia.server.controller.SiteEngineer;

import com.Ascendia.server.dto.SiteEngineer.SampleDto;
import com.Ascendia.server.service.SiteEngineer.SampleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sample")
@AllArgsConstructor
public class SampleController {

    private SampleService sampleService;
    // add the sample API
    @PostMapping("createSample")
    public ResponseEntity<SampleDto> createSample (@RequestBody SampleDto sampleDto){
        SampleDto savedSample = sampleService.createSample(sampleDto);
        return new ResponseEntity<>(savedSample, HttpStatus.CREATED);

    }

    // get comment API
    @GetMapping("{id}")
    public ResponseEntity<SampleDto> getSampleById(@PathVariable("id") int id){
        SampleDto sampleDto =  sampleService.getSampleById(id);
        return ResponseEntity.ok(sampleDto);
    }


    //get all the comment list API
    @GetMapping
    public ResponseEntity <List<SampleDto>> getAllSample(){
        List<SampleDto> samples = sampleService.getAllSample();
        return ResponseEntity.ok(samples);
    }


    //update the sample API
    @PutMapping("{id}")
    public ResponseEntity<SampleDto>updateSample(@PathVariable("id") int id ,@RequestBody SampleDto updateSample){
        SampleDto sampleDto =sampleService.updateSample(id , updateSample);
        return ResponseEntity.ok(sampleDto);
    }

    //delete comment API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSample(@PathVariable("id") int id ){
        sampleService.deleteSample(id);
        return ResponseEntity.ok("sample is delete successfully");
    }


}
