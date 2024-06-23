package com.Ascendia.server.service.SiteEngineer.implt;

import com.Ascendia.server.dto.SiteEngineer.SampleDto;
import com.Ascendia.server.entity.SiteEngineer.Sample;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.SiteEngineer.SampleMapper;
import com.Ascendia.server.repository.SiteEngineer.SampleRepository;
import com.Ascendia.server.service.SiteEngineer.SampleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SampleServiceimplt implements SampleService {
    private SampleRepository sampleRepository;
    @Override
    public SampleDto createSample(SampleDto sampleDto) {
        Sample sample = SampleMapper.mapToSample(sampleDto);
        Sample savedSample = sampleRepository.save(sample);
        return  SampleMapper.mapToSampleDto(savedSample);
    }

    @Override
    public SampleDto getSampleById(int id) {
        Sample sample = sampleRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException( "Sample is not exist with given id "));
        return SampleMapper.mapToSampleDto(sample);

    }

    @Override
    public List<SampleDto> getAllSample() {
        List<Sample> samples= sampleRepository.findAll();

        return samples.stream().map(sample -> SampleMapper.mapToSampleDto(sample))
                .collect(Collectors.toList());
    }

    @Override
    public SampleDto updateSample(int id, SampleDto updatedSample) {
        Sample sample=sampleRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Sample is  not exist with given is : "+ id)
        );
        sample.setFirstName(updatedSample.getFirstName());
        sample.setLastName(updatedSample.getLastName());
        sample.setEmail(updatedSample.getEmail());

        Sample updateSampleObj = sampleRepository.save(sample);


        return SampleMapper.mapToSampleDto(updateSampleObj);
    }

    @Override
    public void deleteSample(int id) {
        Sample sample= sampleRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Sample is  not exist with given is : "+ id)
        );
        sampleRepository.deleteById(id);

    }


}
